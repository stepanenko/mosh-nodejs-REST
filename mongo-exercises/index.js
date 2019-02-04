
// TASKS: 
// - Get all published backend courses
// - Sort them by their name
// - Pick only names and authors and display

const mongoose = require('mongoose');

mongoose.connect('mongodb://rest:rest25@ds046667.mlab.com:46667/mosh-rest', { useNewUrlParser: true })
  .then(console.log('Connected to mLab...'))
  .catch(error => console.error('Couldnt connect to mLab:', error));

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

// addCourses(); // worked without async/await

async function getCourses() {
  const courses = await Course
    .find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 })
    .select({ name: 1, author: 1, _id: 0 });

  console.log(courses);
}

getCourses(); // doesnt work without async/await
