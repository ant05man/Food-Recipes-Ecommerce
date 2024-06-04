const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', authUser);

module.exports = router;
