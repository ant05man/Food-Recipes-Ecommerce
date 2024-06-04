const Recipe = require('../models/Recipe');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('user', 'username', 'email');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};