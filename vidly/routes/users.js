
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');
const auth = require('../middleware/auth');

// === READ ===

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
});

// === CREATE ===

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

// === DELETE ===

router.delete('/:id', auth, async (req, res) => {
  let user;
  try {
    user = await User.findByIdAndDelete(req.params.id);
  }
  catch(ex) {
    console.log('Invalid ID. ', ex.message);
    return res.status(400).send('Invalid ID.');
  }

  if (!user) {
    console.log('User was not found.');
    return res.status(404).send('User not found.');
  }

  console.log(`User '${user.name}' was deleted`);
  res.send(user);
});

module.exports = router;
