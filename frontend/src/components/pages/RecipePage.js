import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/RecipePage.css'; // Import the CSS file

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []); // Fetch recipes on component mount

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recipes');
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      console.log('Fetched Recipes:', data);
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const addRecipeToProfile = async (recipeId) => {
    if (!user || !user._id) {
      alert('You need to be logged in to select recipes');
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`http://localhost:5000/api/users/${user._id}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ recipeId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add recipe');
      }

      alert('Recipe added to profile');
    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Failed to add recipe');
    }
  };

  return (
    <div className="recipe-container"> {/* Apply background and styling */}
      <div className="recipe-content"> {/* Content styling */}
        <h1>Recipe Page</h1>
        <ul className="recipe-list">
          {recipes.map(recipe => (
            <li key={recipe._id} className="recipe-item">
              <h3>{recipe.name}</h3>
              <p>Instructions: {recipe.instructions}</p>
              <p>Ingredients:</p>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <button onClick={() => addRecipeToProfile(recipe._id)}>Select Recipe</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipePage;
