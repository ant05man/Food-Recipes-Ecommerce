// routes/recipeRoutes.js

const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Get all recipes
router.get('/', async (req, res) => {
  console.log('Received GET request for /api/recipes');
  try {
    const recipes = await Recipe.find();
    console.log('Recipes retrieved:', recipes);
    res.json(recipes);
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create a new recipe
router.post('/', async (req, res) => {
  console.log('Received POST request for /api/recipes', req.body);
  const { name, ingredients, instructions, user } = req.body;

  // Validate input
  if (!name || !instructions || !ingredients || !user) {
    return res.status(400).json({ message: "Name, ingredients, instructions, and user are required." });
  }

  // Validate ingredients as a non-empty array
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ message: "Ingredients must be a non-empty array." });
  }

  const newRecipe = new Recipe({
    name,
    ingredients,
    instructions,
    user
  });

  try {
    const createdRecipe = await newRecipe.save();
    console.log('Recipe created:', createdRecipe);
    res.status(201).json(createdRecipe);
  } catch (err) {
    console.error('Error creating recipe:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
