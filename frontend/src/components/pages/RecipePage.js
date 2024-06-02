import React, { useState, useEffect } from 'react';
import RecipeList from '../components/RecipeList';
import { getRecipes } from '../services/recipeService';

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getRecipes();
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      <h2>Recipes</h2>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default RecipePage;
