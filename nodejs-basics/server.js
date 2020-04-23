
// ======= PATH ==========
const path = require('path');
const pathObj = path.parse(__filename);    // gives an object with this file details
// console.log(pathObj); // { root: '/', dir: '...', base: 'server.js', ext: '.js', name: 'server' }


// ======= OS ============
const os = require('os');
// console.log(os.uptime());
// console.log(os.totalmem());
// console.log(os.freemem());


// ========= FS ==========
const fs = require('fs');

fs.readdir('./', (err, data) => {
  if (err) console.log('Error: ', err);
  // console.log(data);   // prints all files in root folder
});

// ======== EVENT ========
const Logger = require('./logger');
const logger = new Logger;

logger.on('message', (message) => {
  console.log('New message:', message);   // fires only when logger.log is fired
});
// logger.log('Some Message');   // Some Message

// ========= HTTP ===========
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello world!');   // localhost:3000/api/courses -> displays 'Hello world!'
    res.end();
  } else if (req.url === '/api/courses') {
    const courses = [1, 2, 3];
    res.write(JSON.stringify(courses));   // localhost:3000/api/courses -> displays [1, 2, 3]
    res.end();
  } else {
    res.statusCode = 404;
    res.write('Oops, no such page');   // all the rest URLs will display 'Oops, no such page'
    res.end();
  }
});

server.listen(3000, () => console.log('Listening...'));

// ==== other packages ====
// const _ = require('lodash');    // to work install lodash with npm or yarn

// const array = _.partition([1,2,3,4,5,6], n => n % 2 === 0);  // [ [ 2, 4, 6 ], [ 1, 3, 5 ] ]
