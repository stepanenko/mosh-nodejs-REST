
const config = require('config');
const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const home = require('./routes/home');
const helmet = require('helmet');
const mongoose = require('mongoose');
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'pug');

app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.get('/', (req, res) => {
  res.send('Welcome to Vidly API');
});

mongoose.connect(
  'mongodb://rest:rest25@ds046667.mlab.com:46667/mosh-rest',
  { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to mLab...'))
  .catch(error => console.error('Couldn connect to mLab', error));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
