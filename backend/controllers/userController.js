const getUserProfile = async (req, res) => {
  try {
    // Fetch user profile logic
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Fetch all users logic
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUserProfile, getAllUsers };
