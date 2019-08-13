
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

async function updateMovie(id, title, genreName, rate) {
  const movie = await Movie.findById(id);
  movie.title = title;
  movie.genre.name = genreName;
  movie.dailyRentalRate = rate;
  const result = await movie.save();
  console.log(result);
}

// createGenre('Sci-Fi');
// createMovie('Me', new Genre({ name: 'Horror' }), 53, 6.2);
updateMovie('5d528a1b5c69da10f4049128', 'Thor: Ragnarock', 'Sci-Fi', 9.3);

