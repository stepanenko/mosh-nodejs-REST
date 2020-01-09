
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Genre, validate } = require('../models/genre');

// =====  CREATE  =====

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    _id: new mongoose.Types.ObjectId,
    name: req.body.name
  });

  genre = await genre.save();
  console.log(genre);

  res.send(genre);
});


// =====  READ  ===== 

router.get('/', async (req, res, next) => {
  try {
    const genres = await Genre
      .find()
      // .select({ __v: 0 }) // will hide '__v' field
      .sort('name');
  res.send(genres);
  }
  catch (ex) {
    next(ex);
  }
});

router.get('/:id', async (req, res, next) => {
  let genre;
  try {
    genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('Such genre was not found');
    console.log(genre);
    res.send(genre);
  }
  catch (ex) {
    next(ex);
  }
});


// =====  UPDATE  =====

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  // === Query-First Approach (my version): ===
  // let genre;
  // try {
  //   genre = await Genre.findById(req.params.id);
  // }
  // catch {
  //   console.log('Oops, some error occured... Not found');
  // }
  // if (!genre) return res.status(404).send('Such genre was not found');
  // genre.name = req.body.name;
  // genre.save();

  // === Update-First Approach (Mosh's version): ===
  let genre;
  try {
    genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
  }
  catch(err) {
    console.log('Error:', err.message);
  }
  if (!genre) return res.status(404).send('Such genre was not found');

  console.log(genre);
  res.send(genre);
});


// =====  DELETE  =====

router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) {
    console.log(`Genre with id '${req.params.id}' was not found`);
    return res.status(404).send(`Genre with id '${req.params.id}' was not found`);
  }

  console.log(`Genre '${genre.name}' was removed`);
  res.send(genre);
});


module.exports = router;
