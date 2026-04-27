const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Mock database
const users = [];

// Register route
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ email, password });
  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ email }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;