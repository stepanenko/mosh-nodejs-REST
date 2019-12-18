
const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect('mongodb+srv://sergio:333444@stepser-komby.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.error('Couldnt connect to DB'));


const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: String,
  genre: {
    type: Object,
    _id: new mongoose.Types.ObjectId,
    name: String
  },
  numberInStock: Number,
  dailyRentalRate: Number
}));

function validateMovie(body) {
  const schema = {
    title: Joi.string().min(3).required(),
    genre: Joi.object().min(2).requiredKeys('name'),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
  }

  return Joi.validate(body, schema);
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

createMovie('Turtles', { name: 'Adventure' }, 43, 5.7);

module.exports.validate = validateMovie;
module.exports.Movie = Movie;
