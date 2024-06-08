// userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserProfile, getAllUsers } = require('../controllers/userController'); // Ensure correct import paths
const { protect } = require('../middleware/authMiddleware'); // Ensure correct import

// Route to get the user profile
router.get('/profile', protect, getUserProfile);

// Route to get all users
router.get('/', getAllUsers);

module.exports = router;
