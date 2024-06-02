import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetail from '../RecipeDetail';
import { getRecipeById } from '../services/recipeService';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await getRecipeById(id);
      setRecipe(data);
    };
    fetchRecipe();
  }, [id]);

  return (
    <div>
      {recipe ? <RecipeDetail recipe={recipe} /> : <p>Loading...</p>}
    </div>
  );
};

export default RecipeDetailPage;
