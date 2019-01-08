
const debug = require('debug')('server');

function myMiddle(req, res, next) {
  debug('My Middleware function 2 is workig');
  next();
}

module.exports = myMiddle;
