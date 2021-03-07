const express = require('express');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Cryptr = require('cryptr');

const cryptr = new Cryptr('myTotalySecretKey');
const Common = require('../models/Common');

const router = express.Router();

router.post('/',[auth,permit('admin')], async(req,res) => {
  try {
    let encString = cryptr.encrypt(req.body.uid);
    const commonData = {
      name: req.body.name,
      lastName: req.body.lastName,
      patronymic: req.body.patronymic,
      phone: req.body.phone,
      address: req.body.address,
      uid: encString
    };
    const common = new Common(commonData);
    await common.save();
    res.send(common)

  }catch (error) {
    return res.status(400).send(error)
  }
});
router.get('/', async(req,res) => {
  const commons = await Common.find();
  res.send(commons)
});

module.exports = router;