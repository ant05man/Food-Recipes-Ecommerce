// models/Recipe.js

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }], // Modified to store ingredients as an array of strings
  instructions: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
