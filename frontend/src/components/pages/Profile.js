import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchUserRecipes = async () => {
        try {
          const response = await fetch(`/api/users/${user._id}/recipes`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setRecipes(data);
          } else {
            console.error('Failed to fetch recipes');
          }
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      };

      fetchUserRecipes();
    }
  }, [user]);

  return (
    <div>
      <h2>Welcome, {user ? user.username : 'Guest'}</h2>
      <h3>Your Selected Recipes</h3>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>
            <h4>{recipe.title}</h4>
            {/* Additional recipe details can be displayed here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
