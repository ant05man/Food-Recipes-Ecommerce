const getAllRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  module.exports = { getAllRecipes };
  