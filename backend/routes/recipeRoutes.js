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

// Create a new recipe
router.post('/', async (req, res) => {
  const recipe = new Recipe(req.body);
  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get one recipe
router.get('/:id', getRecipe, (req, res) => {
  res.json(res.recipe);
});

// Update one recipe
router.patch('/:id', getRecipe, async (req, res) => {
  if (req.body.name != null) {
    res.recipe.name = req.body.name;
  }
  if (req.body.ingredients != null) {
    res.recipe.ingredients = req.body.ingredients;
  }
  if (req.body.instructions != null) {
    res.recipe.instructions = req.body.instructions;
  }
  try {
    const updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one recipe
router.delete('/:id', getRecipe, async (req, res) => {
  try {
    await res.recipe.remove();
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: 'Cannot find recipe' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.recipe = recipe;
  next();
}

module.exports = router;
