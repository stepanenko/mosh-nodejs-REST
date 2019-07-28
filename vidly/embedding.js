
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sergio:333444@stepser-komby.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.error('Couldnt connect to DB'));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema
}));

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course
    .find()
    .select('name author _id');

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

// createCourse('Node Course', new Author({ name: 'Mosh' }));
updateCourse('5d167c5a7e62c219dc286b3f');
listCourses();

