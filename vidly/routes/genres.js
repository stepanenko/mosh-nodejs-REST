
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Genre = new mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: 'String',
    required: true,
    minlength: 3,
    maxlength: 30
  }
}));

async function createGenre() {
  const genre = new Genre({
    _id: new mongoose.Types.ObjectId(),
    name: 'Detective'
  });
  
  const result = await genre.save();
  console.log(result);
};
// createGenre();

async function getGenres() {
  const genres = await Genre
    .find()
    .select({ name: 1, _id: 0 });

  console.log(genres);
}
// getGenres();

// =====  READ  ===== 

router.get('/', async (req, res) => {
  const genres = await Genre
    .find()
    // .select({ __v: 0 }) // will hide '__v' field
    .sort('name');
  
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    console.log(genre);
    res.send(genre);
  }
  catch {
    res.status(404).send('Such genre was not found');
  }

  // try {
  //   const genre = await Genre
  //     .find({ _id: req.params.id });
  //   console.log(genre);
  //   res.send(genre);
  // }
  // catch (err) {
  //   console.log(err.message);
  //   res.send(err.message);
  // }
});

// =====  CREATE  =====

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    _id: new mongoose.Types.ObjectId,
    name: req.body.name
  });

  const result = await genre.save();
  console.log(result);

  res.send(result);
});

// =====  UPDATE  =====

router.put('/:id', async (req, res) => {
  let genre;
  try {
    genre = await Genre.findById(req.params.id);
  }
  catch {
    console.log('Such genre was not found');
  }
  if (!genre) return res.status(404).send('Such genre was not found');

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  genre.name = req.body.name;

  genre.save();
  console.log(genre);
  res.send(genre);
});

// =====  DELETE  =====

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) {
    console.log(`Genre with id '${req.params.id}' was not found`);
    return res.status(404).send(`Genre with id '${req.params.id}' was not found`);
  }

  console.log(`Genre '${genre.name}' was removed`);
  res.send(genre);
});

// ===== VALIDATION  =====

function validate(body) {
  const schema = {
    name: Joi.string().min(3).required()
  }

  return Joi.validate(body, schema);
}

module.exports = router;
