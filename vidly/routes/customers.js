
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

// === UPDATE ===
router.put('/:id', async (req, res) => {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);
  }
  catch {
    console.log('Customer was not found');
  }
  if (!customer) return res.status(404).send('Customer was not found');

  customer.name = req.body.name;
  customer = await customer.save();

  res.send(customer);
  console.log(customer, '<- updated successfuly');
});

module.exports = router;
