// userController.js
const User = require('../models/User');

const getUserProfile = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.user.userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user profile
    res.status(200).json(user);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserProfile,
};
