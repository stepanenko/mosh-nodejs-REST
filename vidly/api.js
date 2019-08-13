
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sergio:333444@stepser-komby.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.error('Couldnt connect to DB'));

const genreSchema = new mongoose.Schema({
  name: String
});

const movieSchema = new mongoose.Schema({
  title: String,
  genre: genreSchema,
  numberInStock: Number,
  dailyRentalRate: Number
});

const Genre = mongoose.model('Genre', genreSchema);
const Movie = mongoose.model('Movie', movieSchema);

async function createGenre(name) {
  const genre = new Genre({
    name
  });

  const result = await genre.save();
  console.log(result);
}

async function createMovie(title, number, rate) {
  const movie = new Movie({
    title,
    number,
    rate
  })
}

createGenre('Sci-Fi');
