
const express = require('express');
const Joi = require('joi');
const myMiddleware = require('./myMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(function(req, res, next) {
  console.log('hello my middleware 1');
  next();
});

app.use(myMiddleware);

let genres = [
  { id: 1, name: 'Thriller' },
  { id: 2, name: 'Action' },
  { id: 3, name: 'Drama' }
];

app.get('/', (req, res) => {
  res.send('Welcome to Vidly API');
});

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send('Such genre was not found');

  res.send(genre);
});

app.post('/api/genres', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newGenre = {
    id: genres.length + 1,
    name: req.body.name
  }

  genres = [...genres, newGenre];

  res.send(newGenre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send('Such genre was not found');

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  genre.name = req.body.name;

  res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send('Such genre was not found');

  genres = genres.filter(g => g !== genre);

  res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on 3000');
});

function validate(body) {
  const schema = {
    name: Joi.string().min(2).required()
  }

  return Joi.validate(body, schema);
}
