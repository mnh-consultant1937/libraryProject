const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Register form
router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register' });
});

// Register user
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Check if any users exist
    const userCount = await User.countDocuments();

    // If first user, make admin
    const role = userCount === 0 ? 'admin' : 'member';

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      role: role
    });

    await user.save();
    res.redirect('/auth/login');
  } catch (err) {
    res.send(err.message);
  }
});

// Login form
router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

// Login user
router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.send("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.send("Invalid password");

  req.session.user = user;
  res.redirect('/');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;