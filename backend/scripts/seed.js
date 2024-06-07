const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const newRecipe = new Recipe({
  name: 'Spaghetti Carbonara',
  ingredients: ['200g spaghetti', '100g pancetta', '2 large eggs', '50g pecorino cheese', '50g parmesan cheese', '2 plump garlic cloves', '50g unsalted butter', 'Sea salt and freshly ground black pepper'],
  instructions: '1. Cook the spaghetti. 2. Fry the pancetta. 3. Beat the eggs with cheese...',
});

newRecipe.save()
  .then((result) => {
    console.log('Recipe saved successfully:', result);
    mongoose.connection.close(); // Close the connection after saving
  })
  .catch((error) => {
    console.error('Error saving recipe:', error);
  });
