// ====== Modules ========
const log = require('./logger');
// log('Tom');


// ======= Path ==========
const path = require('path');
const pathObj = path.parse(__filename);
// console.log(pathObj);


// ======= OS ============
const os = require('os');
// console.log(os.uptime());
// console.log(os.totalmem());
// console.log(os.freemem());


// ========= FS ==========
const fs = require('fs');

fs.readdir('./', (err, data) => {
  if (err) console.log('Error: ', err);
  // console.log(data);
});

// ======== Event ========
const Logger = require('./logger');

const logger = new Logger;

logger.on('message', (message) => {
  console.log('New message:', message);
});

// logger.log('New Message');

// ========= HTTP ===========
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello world!');
    res.end();
  } else if (req.url === '/api/courses') {
    const courses = [1, 2, 3];
    res.write(JSON.stringify(courses));
    res.end();
  } else {
    res.statusCode = 404;
    res.write('Not found');
    res.end();
  }
});

server.listen(3000, () => console.log('Listening...'));

// ==== other packages ===
const _ = require('lodash');

const array = _.partition([1,2,3,4,5,6], n => n % 2 === 0);
// console.log(array); // [ [ 2, 4, 6 ], [ 1, 3, 5 ] ]
