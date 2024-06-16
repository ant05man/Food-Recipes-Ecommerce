// User.js (Model)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }] // Add recipes field
});

module.exports = mongoose.model('User', userSchema);
