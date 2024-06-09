const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Get all recipes
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all recipes...');
    const recipes = await Recipe.find();
    console.log('Recipes fetched:', recipes);
    res.json(recipes);
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ message: 'Failed to fetch recipes', error: err.message });
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
    console.log('Saving new recipe...');
    const createdRecipe = await newRecipe.save();
    console.log('Recipe saved:', createdRecipe);
    res.status(201).json(createdRecipe);
  } catch (err) {
    console.error('Error saving recipe:', err);
    res.status(400).json({ message: 'Failed to save recipe', error: err.message });
  }
});

module.exports = router;
