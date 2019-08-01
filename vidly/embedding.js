
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sergio:333444@stepser-komby.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.error('Couldnt connect to DB'));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
  age: Number
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [ authorSchema ]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

async function listCourses() {
  const courses = await Course
    .find()
    .select('name authors _id');

  console.log(courses);
}

async function updateCourse(id) {
  // const course = await Course.findById(id);
  // course.author.name = 'Serhiy';
  // course.save();

  // Direct updating
  await Course.updateOne({ _id: id}, {
    $set: {
      'author.name': 'Tom Cruise'
    }
    // To delete subdocument use $unset:
    // $unset: {
    //   'author': ''
    // }
  });
}

// createCourse('Java Course', [
//   new Author({ name: 'Tom', website: 'tompro.com.ua' }),
//   new Author({ name: 'Jess', bio: 'Junio' })
// ]);
// addAuthor('5d42a304c07b2c070481fa44', new Author({ name: 'Jim', age: 45 }));
// removeAuthor('5d42a304c07b2c070481fa44', '5d42a49975283e21b8c3c5fb');
// updateCourse('5d167c5a7e62c219dc286b3f');
listCourses();

