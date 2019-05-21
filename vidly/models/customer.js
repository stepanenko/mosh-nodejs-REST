
const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 12
  }
}));

// ===  Validation  ===
function validateCustomer(body) {
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(10).max(12).required()
  }

  return Joi.validate(body, schema);
}


module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
