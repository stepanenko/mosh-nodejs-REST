
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://sergio:333444@stepser-komby.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Connected to mongodb.com...'))
  .catch(err => console.error('Couldn\'t connect to mongodb.com'));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Category = mongoose.model('Category', new mongoose.Schema({
  name: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
}));

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

async function createCategory(name) {
  const category = new Category({ name });

  const result = await category.save();
  console.log(result);
}

async function createCourse(name, author, category) {
  const course = new Course({
    name,
    author,
    category
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course
    .find()
    .populate('author', 'name -_id')
    // .populate('category', 'name -_id')
    .select('name author -_id');

  console.log(courses);
}

async function getAuthors() {
  const authors = await Author.find().select('-_id -__v');
  console.log(authors);
}

// createAuthor('Mosh', 'my bio', 'my website');
// createCourse('CoffeeScript', '5cf3d5e366ac7920e4caac15');
// createCategory('Back End');
listCourses();

// getAuthors();
