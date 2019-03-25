
const mongoose = require('mongoose');

mongoose.connect('mongodb://rest:rest25@ds046667.mlab.com:46667/mosh-rest', { useNewUrlParser: true })
  .then(() => console.log('Connected to mongoDB...'))
  .catch((error) => console.error('Couldnt connect to mongoDB...', error));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 32,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network']
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function(v) {
        return v && v.length > 0;  // custom validation
      },
      message: 'A course should have at least one tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() { return this.isPublished; },
    min: 5,
    max: 160
  }
});

const Course = mongoose.model('Course', courseSchema);

// =======  CREATE  ========

async function createCourse() {
  const course = new Course({
    _id: new mongoose.Types.ObjectId, // generate proper id
    name: 'CSS',
    author: 'Sara',
    tags: null,
    category: 'web',
    isPublished: true,
    price: 9
  });

  try {
    const result = await course.save();
    console.log(result);
    // await course.validate(); // works but returns void promise
  }
  catch (error) {
    console.log(error.message);
  }
}
createCourse(); // will add a new course

// We have these two ways of generating a valid ids:
// If the schema of id is not of type ObjectId you cannot operate with findById()
var id = mongoose.Types.ObjectId(); // will generate a new id
var id2 = new mongoose.Types.ObjectId; // will also generate a new id
// console.log(id, id2); 
// https://stackoverflow.com/questions/17899750/how-can-i-generate-an-objectid-with-mongoose

// ========  READ  ========

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

    // starts with Mosh:
    // .find({ author: /^Mosh/ })
    
    // ends with Hamedani:
    // .find({ author: /Hamedani$/i })
    
    // contains Mosh
    .find({ author: /.*Mosh.*/i })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
    // .countDocuments() // 5
    console.log(courses);
  }
// getCourse();

// =======  UPDATE  ========

// QUERY-FIRST APPROACH:
async function updateCourse1() {
  const course = await Course.findById('5c60811b2bc8da0cbc91a0ca');
  // If the schema of id is not of type ObjectId you cannot operate with findById()
  if (!course) return console.log('Course not found');

  course.isPublished = true;
  course.author = 'Brad';

  // course.set({
  //   isPublished: false,
  //   author: 'Brad'
  // });

  // course.save();
  console.log(course);
}
// updateCourse1();


// UPDATE-FIRST APPROACH:
async function updateCourse2(id) {
  const course = await Course.findOneAndUpdate(id, {
    $set: {
      author: 'Jason',
      isPublished: false
    }
  }, { new: true }); // without new:true will return doc before the update
  console.log(course); 
}
// updateCourse2('5c60811b2bc8da0cbc91a0ca');

// ========  DELETE  ========

async function deleteCourse() {
  // const result = await Course.deleteOne({ _id: '5c6079a3081e5f05a03ef548' });
  // const result = await Course.deleteOne({ author: 'Brandy' });
  const course = await Course.findByIdAndRemove('5a68fe2142ae6a6482c4c9cb');

  console.log(course); // will return Null if the course is not found
}
// deleteCourse();
