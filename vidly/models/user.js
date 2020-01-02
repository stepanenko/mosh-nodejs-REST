
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

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
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

function validateUser(user) {
  const complexityOptions = {
    min: 5,
    max: 255,
    lowerCase: 1,
    upperCase: 1,
    numeric: 2,
    symbol:1
  }

  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    // password: Joi.string().min(5).max(255).required()
    password: new PasswordComplexity(complexityOptions)
  }

  return Joi.validate(user, schema);
}

const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.validate = validateUser;
