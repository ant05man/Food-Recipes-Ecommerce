// routes/mealPlanRoutes.js

const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');
const Recipe = require('../models/Recipe');

// Add recipe to meal planner
router.post('/add', async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    // Check if recipe and user exist
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Create or update meal plan for the user
    let mealPlan = await MealPlan.findOne({ user: userId });
    if (!mealPlan) {
      mealPlan = new MealPlan({ user: userId, recipes: [recipeId] });
    } else {
      if (!mealPlan.recipes.includes(recipeId)) {
        mealPlan.recipes.push(recipeId);
      }
    }

    // Save meal plan
    await mealPlan.save();

    res.status(201).json({ message: 'Recipe added to meal planner successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get meal planner for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find meal planner for the user
    const mealPlan = await MealPlan.findOne({ user: userId }).populate('recipes');
    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal planner not found' });
    }

    res.json(mealPlan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
