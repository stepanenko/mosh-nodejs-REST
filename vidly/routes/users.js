
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    await user.save();
    res.send(user);
  }
  catch(ex) {
    if (ex.code === 11000) {
      res.status(400).send('User with such email already exist');
    } else {
      res.status(400).send(ex.errmsg);
    }
  }
});

module.exports = router;
