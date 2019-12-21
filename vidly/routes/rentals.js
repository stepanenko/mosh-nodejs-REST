
const router = require('express').Router();
const { Rental, validate } = require('../models/rental');
const Customer = require('../models/customer');
const Movie = require('../models/movie');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  console.log(rentals);
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');



  let rental = new Rental({
    customer: {
      _id: customer.id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie.id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    },
  });
  rental = await rental.save();
  console.log(rental);

  movie.numberInStock--;
  movie.save();
  
  res.send(rental);
});


module.exports = router;
