
// TASKS: 
// - Get all published backend courses
// - Sort them by their name
// - Pick only names and authors and display

const mongoose = require('mongoose');

mongoose
  .connect('mongodb://rest:rest25@ds046667.mlab.com:46667/mosh-rest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log('Connected to mLab...'))
  .catch(error => console.error('Couldn\'t connect to mLab:', error));

const Course = mongoose.model('Course', {});

const json = require('./exercise-data.json');
// console.log(json);

function addCourses() {
  Course.collection.insertMany(json, (err, result) => {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Data inserted');
    }
  });
}

// addCourses();   // works without async/await

// EXERCISE 1:
// async function getCourses() {
//   return await Course
//     .find({ isPublished: true, tags: 'backend' })
//     .sort({ name: 1 })
//     .select({ name: 1, author: 1, _id: 0 });
// }

// EXERCISE 2:
// async function getCourses() {
//   return await Course
//     .find({ isPublished: true, tags: { $in: ['backend', 'frontend']} })
//     .sort('-price')   // or .sort({ price: -1 })
//     .select({ price: 1, name: 1, author: 1, _id: 0 });
// }

// EXERCISE 3:
async function getCourses() {
  return await Course
    .find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .select({ price: 1, name: 1, author: 1, _id: 0 });
}

async function displayCourses() {
  const courses = await getCourses();   // doesn't work without async/await
  console.log(courses);
}

displayCourses();
