// userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserProfile, getAllUsers } = require('../controllers/userController'); // Import the controller method for fetching all users
const { protect } = require('../middleware/authMiddleware');

// Get user profile
router.get('/profile', protect, getUserProfile);

// Get all users
router.get('/', getAllUsers);

module.exports = router;
