
const express = require('express');

const app = express();

const courses = [
  { id: 1, name: 'Java' },
  { id: 2, name: 'Python' },
  { id: 3, name: 'NodeJS' }
];

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id == req.params.id);
  course ? res.send(course) : res.send('Course not found');
});

app.get('/api/posts/:year/:month', (req, res) => {
  // res.send(req.params); // returns { "year": "...", "month": "..." }
  res.send(req.query); // returns { ... }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
