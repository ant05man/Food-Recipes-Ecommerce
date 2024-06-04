const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Get user profile
router.get('/profile', protect, getUserProfile);

module.exports = router;
