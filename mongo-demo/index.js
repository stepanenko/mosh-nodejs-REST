
const mongoose = require('mongoose');

mongoose.connect('mongodb://rest:rest25@ds046667.mlab.com:46667/mosh-rest', { useNewUrlParser: true })
  .then(() => console.log('Connected to mongoDB...'))
  .catch((error) => console.error('Couldnt connect to mongoDB...', error));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: false
  });
  
  const result = await course.save();
  console.log(result);
}
// createCourse(); // will add a new course

async function getCourse() {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)
  // will have $ sign before (e.g. $gt)

  // or
  // and

  const courses = await Course
    // .find({ author: 'Mosh' })
    // .find({ price: { $gte: 10, $lte: 20 }})
    // .find({ price: { $in: [15, 20, 30]}})
    // .find()
    // .and([ { author: 'Mosh' }, { isPublished: true } ])

    // starts with Mosh
    // .find({ author: /^Mosh/ })

    // ends with Hamedani
    // .find({ author: /Hamedani$/i })

    // contains Mosh
    .find({ author: /.*Mosh.*/i })
    .limit(5)
    .sort({ name: 1 })
    .select({ name: 1, author: 1, _id: 0 });
  console.log(courses);
}

getCourse();
