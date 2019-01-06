
const express = require('express');

const app = express();

app.use(express.json());

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

  if (!genre) return res.send('Such genre was not found');

  res.send(genre);
});

app.post('/api/genres', (req, res) => {
  const newGenre = {
    id: genres.length + 1,
    name: req.body.name
  }

  genres = [...genres, newGenre];

  res.send(newGenre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on 3000');
});
