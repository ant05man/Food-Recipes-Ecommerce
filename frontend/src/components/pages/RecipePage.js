import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recipes from backend API
    fetch('http://localhost:5000/api/recipes')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Recipes:', data);
        setRecipes(data);
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const handleSelectRecipe = async (recipeId) => {
    if (!user) {
      alert('You need to be logged in to select recipes');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ recipeId }),
      });

      if (response.ok) {
        alert('Recipe added to profile');
      } else {
        alert('Failed to add recipe');
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

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
            <button onClick={() => handleSelectRecipe(recipe._id)}>Select Recipe</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipePage;
