
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  }
}));

// === CREATE ===
router.post('/', async (req, res) => {
  let customer = new Customer({
    _id: new mongoose.Types.ObjectId,
    name: req.body.name
  });

  customer = await customer.save();
  console.log(customer);

  res.send(customer);
});

// === READ ===
router.get('/', async (req, res) => {
  const customers = await Customer.find();

  res.send(customers);
});

module.exports = router;
