import React, { useState, useEffect } from 'react';

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from backend API
    fetch('http://localhost:5000/api/recipes')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Recipes:', data);
        setRecipes(data);
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }, []); // Empty dependency array to run effect only once

  return (
    <div>
      <h1>Recipe Page</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>
            <h3>{recipe.name}</h3>
            <p>Instructions: {recipe.instructions}</p>
            <p>Ingredients:</p>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipePage;
