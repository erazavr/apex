const express = require('express');
const bcrypt = require("bcrypt");

const User = require('../models/User');

const router = express.Router();

router.post ('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  try {
    user.generateToken();
    await user.save();
    return res.send(user)
  } catch (error) {
    return res.status(400).send(error)
  }
});
router.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username});
  if (!user) {
    return res.status(400).send({error: 'Username or password not correct'})
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  console.log(req.body.password + "-" + user)
  if (!isMatch) {
    return res.status(400).send({error: 'Username or password not correct'});
  }
  user.generateToken();
  await user.save();
  res.send(user)
});

router.delete('/sessions', async (req, res) => {
  const success = {message: "Success"};
  try {
    const token = req.get('Authorization').split(' ')[1];
    if (!token) return res.send(success);
    const user = await User.findOne({token});
    if (!user) return res.send(success);

    user.generateToken();
    await user.save();
    res.send(success);
  } catch (error) {
    return res.send(success)
  }

});
module.exports = router;