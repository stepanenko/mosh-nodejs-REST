
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  rental: {
    type: Number,
    required: true
  }
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
