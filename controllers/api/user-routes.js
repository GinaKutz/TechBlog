const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Sign up route
router.post('/signup', async (req, res) => {
  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Set the loggedIn session variable and redirect to the homepage
    req.session.loggedIn = true;
    req.session.userId = newUser.id; // Optionally, store the user ID in the session
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Set the loggedIn session variable and redirect to the homepage
    req.session.loggedIn = true;
    req.session.userId = user.id; // Optionally, store the user ID in the session
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;

