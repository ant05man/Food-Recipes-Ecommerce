// routes/recipeRoutes.js

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

// Get a single recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new recipe
router.post('/', async (req, res) => {
  const { name, ingredients, instructions, user } = req.body;

  // Create a new recipe object
  const newRecipe = new Recipe({
    name,
    ingredients,
    instructions,
    user
  });

  try {
    // Save the new recipe to the database
    const createdRecipe = await newRecipe.save();
    res.status(201).json(createdRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a recipe
router.patch('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    // Update the recipe fields
    recipe.name = req.body.name || recipe.name;
    recipe.ingredients = req.body.ingredients || recipe.ingredients;
    recipe.instructions = req.body.instructions || recipe.instructions;
    // Save the updated recipe
    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a recipe
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    await recipe.remove();
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
