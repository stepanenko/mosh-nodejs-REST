
const router = require('express').Router();
const Rental = require('../models/rental');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  const rentals = await Rental.find();

  console.log(rentals);
  res.send(rentals);
});

router.post('/', async (req, res) => {
  let rental = new Rental({
    _id: new mongoose.Types.ObjectId,
    rental: req.body.rental
  });

  rental = await rental.save();
  console.log(rental);

  res.send(rental);
});


module.exports = router;
