const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new recipe
router.post('/', async (req, res) => {
  console.log('Request Body:', req.body);
  const { name, ingredients, instructions, user } = req.body;

  if (!name || !instructions || !ingredients || !user) {
    return res.status(400).json({ message: "Name, ingredients, instructions, and user are required." });
  }

  const newRecipe = new Recipe({
    name,
    ingredients,
    instructions,
    user
  });

  try {
    const createdRecipe = await newRecipe.save();
    res.status(201).json(createdRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
