
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {
    title: 'VIDLY API',
    message: 'VIDLY Home Page'
  });
});

module.exports = router;
