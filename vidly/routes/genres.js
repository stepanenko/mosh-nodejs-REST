
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

let genres = [
  { id: 1, name: 'Thriller' },
  { id: 2, name: 'Action' },
  { id: 3, name: 'Drama' }
];

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

router.get('/', async (req, res) => {
  const genres = Genre.find().sort('name');
  
  res.send(genres);
});

router.get('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send('Such genre was not found');

  res.send(genre);
});

router.post('/', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newGenre = {
    id: genres.length + 1,
    name: req.body.name
  }

  genres = [...genres, newGenre];

  res.send(newGenre);
});

router.put('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send('Such genre was not found');

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  genre.name = req.body.name;

  res.send(genre);
});

router.delete('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send('Such genre was not found');

  genres = genres.filter(g => g !== genre);

  res.send(genre);
});

function validate(body) {
  const schema = {
    name: Joi.string().min(2).required()
  }

  return Joi.validate(body, schema);
}

module.exports = router;
