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

logger.log('New Message');
