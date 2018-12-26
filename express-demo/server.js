
const Joi = require('joi');
const express = require('express');

const app = express();

app.use(express.json());

let courses = [
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
  const course = courses.find(c => c.id === parseInt(req.params.id));
  course ? res.send(course) : res.status(404).send('Course not found');
});

app.get('/api/posts/:year/:month', (req, res) => {
  // res.send(req.params); // returns { "year": "...", "month": "..." }
  res.send(req.query); // returns { ?... }
});

app.post('/api/courses', (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  
  courses = courses.concat(course);
  // courses = [...courses, course]; // also works
  
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  let course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send('Course not found');
    return;
  }
  
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name = req.body.name

  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));

function validate(body) {
  const schema = {
    name: Joi.string().min(2).required()
  }

  return Joi.validate(body, schema);
}
