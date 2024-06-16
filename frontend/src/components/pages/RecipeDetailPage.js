import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const handleSelectRecipe = async () => {
    if (!user) {
      alert('Please login to select recipes');
      return;
    }

    try {
      const response = await fetch(`/api/users/${user._id}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ recipeId: id }),
      });

      if (response.ok) {
        alert('Recipe selected successfully!');
      } else {
        alert('Failed to select recipe');
      }
    } catch (error) {
      console.error('Error selecting recipe:', error);
    }
  };

  return (
    <div>
      <h1>Recipe Detail Page</h1>
      <button onClick={handleSelectRecipe}>Select Recipe</button>
    </div>
  );
};

export default RecipeDetailPage;
