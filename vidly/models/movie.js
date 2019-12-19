
const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

// mongoose.connect('mongodb+srv://sergio:333444@stepser-komby.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
//   .then(() => console.log('Connected to mongoDB'))
//   .catch(err => console.error('Couldnt connect to DB'));


const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
}));

// ===== VALIDATION  =====

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(3).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  }

  return Joi.validate(movie, schema);
}

async function createMovie(title, genre, number, rate) {
  const movie = new Movie({
    title,
    genre,
    numberInStock: number,
    dailyRentalRate: rate
  });

  const result = await movie.save();
  console.log(result);
}

// createMovie('Turtles', '5dfb3bb61c9d440000ec4c6f', 113, 5.27);

module.exports.validate = validateMovie;
module.exports.Movie = Movie;
