
module.exports = function(err, req, res, next) {
  console.log('Something failed.');
  res.status(500).send('Something failed.');
}
