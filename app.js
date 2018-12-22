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
const EventEmitter = require('events');
const emitter = new EventEmitter;


emitter.on('messageLogged', function(data) {
  console.log('message received:', data);
});

emitter.on('message', (message) => {
  console.log('New message:', message);
});

emitter.emit('messageLogged', { id: 1, url: 'http://' });

emitter.emit('message', { user: 'John', message: 'Hello world'});
