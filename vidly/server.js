
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const config = require('config');
const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const helmet = require('helmet');
const mongoose = require('mongoose');

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const home = require('./routes/home');
const error = require('./middleware/error');

const app = express();

console.log(config.get('jwtPrivateKey'));
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
  // if error occurs at this point, review video #57 - Configuration
} else {
  console.log('jwtPrivateKey was set to:', config.get('jwtPrivateKey'));
}

console.log('NODE_ENV:', process.env.NODE_ENV); // or app.get('env')
// to set to production type "export NODE_ENV=production" in the terminal

console.log('Parsed Dotenv:', dotenv.parsed);   // { jwtPrivateKey: 'vidly_jwtPrivateKey' }

app.use(helmet()); // express' third-party middleware
app.use(express.json()); // built-in middleware
app.use(express.urlencoded({ extended: true })); // built-in middleware
app.use(express.static('public'));

app.set('view engine', 'pug');

app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

app.get('/', (req, res) => {
  res.send('Welcome to Vidly API');
});

mongoose.connect('mongodb://rest:rest25@ds046667.mlab.com:46667/mosh-rest', {
  useCreateIndex: true,      // added to avoid (node:1601) DeprecationWarning
  useNewUrlParser: true,     // added to avoid (node:9768) DeprecationWarning
  useUnifiedTopology: true   // added to avoid (node:9323) DeprecationWarning
})
  .then(() => console.log('Connected to mLab...'))
  .catch(error => console.error('Could\'n connect to mLab', error));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
