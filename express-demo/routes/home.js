
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Mosh RESTful API',
    message: 'Hello World!'
  });
});

module.exports = router;
