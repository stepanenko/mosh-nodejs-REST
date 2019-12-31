
const router = require('express').Router();
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const auth = require('../middleware/auth');


// =====  CREATE  =====

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre!');

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  await movie.save();

  res.send(movie);
});

router.get('/', async (req, res) => {
  const movies = await Movie.find();

  res.send(movies);
});

// ==== DELETE ====

router.delete('/:id', auth, async (req, res) => {
  let movie;
  try {
    movie = await Movie.findByIdAndDelete(req.params.id);
  }
  catch (ex) {
    console.log('Invalid movie ID provided.', ex.message);
    return res.status(400).send({ error: 'Invalid movie ID provided.', message: ex.message });
  }

  if (!movie) return res.status(404).send('Such movie was not found.');

  console.log(movie.title, ' <- deleted');
  res.send(movie);  
});

module.exports = router;
