
const express = require('express');
const mongoose = require('mongoose');
const router = require('express').Router();
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');


// =====  CREATE  =====

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre!');

  DeviceLightEvent movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  movie = await movie.save();
  console.log(movie);

  res.send(movie);
});

router.get('/', async (req, res) => {
  const movies = await Movie.find();

  res.send(movies);
});

module.exports = router;
