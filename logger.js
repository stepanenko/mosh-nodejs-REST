
const EventEmitter = require('events');
// console.log(__filename);
// console.log(__dirname);

class Logger extends EventEmitter {
  log(message) {
    console.log(message);

    this.emit('message', {
      user: 'Tom',
      message: 'hello world'
    });
  }
}

module.exports = Logger;
// exports.log = log; // also valid

