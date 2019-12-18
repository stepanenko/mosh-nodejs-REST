
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sergio:333444@stepser-komby.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.error('Couldnt connect to DB'));

const genreSchema = new mongoose.Schema({
  name: String
});

const movieSchema = new mongoose.Schema({
  title: String,
  // --- Doc reference: ---
  genre: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre' 
  },
  // --- Doc embedding: ---
  // genre: genreSchema,
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

// --- Updating for reference approach ---
// async function updateMovie(id, title, genreId, rate) {
//   const movie = await Movie.findById(id);
//   movie.title = title;
//   movie.genre = genreId;
//   movie.dailyRentalRate = rate;
//   const result = await movie.save();
//   console.log(result);
// }

async function updateGenre(movieId, newGenreName) {
  const movie = Movie.findById(movieId);
  movie.genre.name = newGenreName;
  const result = await movie.save();
  console.log(result);
}

async function listMovies() {
  const movies = await Movie
    .find()
    .populate('genre', 'name -_id') // <-- For reference approach
    .select('title numberInStock dailyRentalRate -_id')
  
  console.log(movies);
}

// createGenre('Drama');
// createMovie('Independance Day', '5d52861236dccc1c909983e3', 441, 6.4); // with ref
// createMovie('Deception', new Genre({ name: 'Thriller' }), 221, 6.8); // with embedded
// updateMovie('5d5288dc7b8249145868e3de', 'Star Wars: Rogue One', '5d52861236dccc1c909983e3', 7); // for reference approach

listMovies();
