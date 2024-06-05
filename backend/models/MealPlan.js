// models/MealPlan.js
const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }], // References Recipe model
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // References User model
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan;
