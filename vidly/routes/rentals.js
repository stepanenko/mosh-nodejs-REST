
const router = require('express').Router();
const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const mongoose = require('mongoose');
const Fawn = require('fawn');

Fawn.init(mongoose);

// === READ ===

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  console.log(rentals);
  res.send(rentals);
});

// === CREATE ===

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

  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', { _id: movie._id }, {
        $inc: { numberInStock: -1 }
      })
      .run();
      
      res.send(rental);
  }
  catch(ex) {
    res.status(500).send('Something went wrong');
  }
  // Fawn does a series of steps(Task) to edit a mongoDB database. If an error occurs on any of the steps, the database is returned to its initial state - before the transaction started.
});

// === DELETE ===

router.delete('/:id', async (req, res) => {
  let rental;
  try {
    rental = await Rental.findByIdAndDelete(req.params.id);
  }
  catch (ex) {
    console.log('Invalid rental ID provided.', ex.message);
    return res.status(400).send({ 
      error: 'Invalid rental ID provided.',
      info: ex.message
    });
  }

  if (!rental) return res.status(404).send({
    error: `Rental with ID: ${req.params.id} was not found.`
  });

  console.log('Rental with ID: ' + rental._id + ' was deleted.');
  res.send(rental);
});

module.exports = router;
