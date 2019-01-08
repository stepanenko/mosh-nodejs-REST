
const express = require('express');
const myMiddleware = require('./middleware/myMiddleware');
const debug = require('debug')('server');
const genres = require('./routes/genres');
const home = require('./routes/home');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'pug');

app.use(function(req, res, next) {
  debug('hello my middleware 1');
  next();
});

app.use(myMiddleware);
app.use('/', home);
app.use('/api/genres', genres);

app.get('/', (req, res) => {
  res.send('Welcome to Vidly API');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
