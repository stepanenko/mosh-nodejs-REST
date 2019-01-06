
function myMiddle(req, res, next) {
  console.log('My Middleware function 2 is workig');
  next();
}

module.exports = myMiddle;
