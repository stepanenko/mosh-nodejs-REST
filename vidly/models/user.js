
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    require: true,
    minlength: 6,
    maxlength: 50
  },
  password: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 50
  }
});


function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(50).required()
  }

  return Joi.validate(user, schema);
}

const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.validate = validateUser;
