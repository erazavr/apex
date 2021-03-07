const mongoose = require('mongoose');

const CommonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  patronymic: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true
  }
});

const Common = mongoose.model('Common', CommonSchema);

module.exports = Common;