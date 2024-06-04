const express = require('express');
const router = express.Router();
const { 
  getRecipes, 
  getRecipeById, 
  createRecipe, 
  updateRecipe, 
  deleteRecipe 
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

// Get all recipes
router.get('/', getRecipes);

// Get a single recipe by ID
router.get('/:id', getRecipeById);

// Create a new recipe
router.post('/', protect, createRecipe);

// Update a recipe
router.put('/:id', protect, updateRecipe);

// Delete a recipe
router.delete('/:id', protect, deleteRecipe);

module.exports = router;
