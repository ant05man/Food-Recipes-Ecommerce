const Recipe = require('../models/Recipe');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('user', 'username', 'email');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createRecipe = async (req, res) => {
    const { name, ingredients, instructions } = req.body;
    try {
        const recipe = new Recipe({
            name,
            ingredients,
            instructions,
            user: req.user.id,
        });
        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};