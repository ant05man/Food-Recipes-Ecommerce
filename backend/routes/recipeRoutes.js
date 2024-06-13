const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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
  const { name, ingredients, instructions, user } = req.body;
  
  const newRecipe = new Recipe({
    name,
    ingredients,
    instructions,
    user: user ? mongoose.Types.ObjectId(user) : undefined // Only set user if provided
  });

  try {
    const createdRecipe = await newRecipe.save();
    res.status(201).json(createdRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing recipe
router.put('/:id', async (req, res) => {
  console.log('Received PUT request for /api/recipes/:id', req.params.id, req.body);
  const { name, ingredients, instructions, user } = req.body;

  // Validate input
  if (!name || !instructions || !ingredients || !user) {
    return res.status(400).json({ message: "Name, ingredients, instructions, and user are required." });
  }

  // Validate ingredients as a non-empty array
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ message: "Ingredients must be a non-empty array." });
  }

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { name, ingredients, instructions, user },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    console.log('Recipe updated:', updatedRecipe);
    res.json(updatedRecipe);
  } catch (err) {
    console.error('Error updating recipe:', err);
    res.status(400).json({ message: err.message });
  }
});

// Delete an existing recipe
router.delete('/:id', async (req, res) => {
  console.log('Received DELETE request for /api/recipes/:id', req.params.id);
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    console.log('Recipe deleted:', deletedRecipe);
    res.json({ message: 'Recipe deleted successfully.' });
  } catch (err) {
    console.error('Error deleting recipe:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
