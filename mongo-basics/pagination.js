
const mongoose = require('mongoose');

mongoose.connect('mongodb://rest:rest25@ds046667.mlab.com:46667/mosh-rest', { useNewUrlParser: true })
  .then(console.log('Connected to mLab...'))
  .catch(err => console.log('Couldnt connect to mLab:', err));

const Course = mongoose.model('Course', {});   // will get data from DB even though no fields are provided

async function getCourses() {
  const pageNumber = 2;   // hardcoded
  const pageSize = 10;   // hardcoded
  // /api/courses?pageNumber=2&pageSize=10   // thats how it looks in real world

  const courses = await Course
    .find()
    // .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  
  console.log(courses);
}

getCourses();
