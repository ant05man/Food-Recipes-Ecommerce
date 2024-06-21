import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../../styles/Profile.css'; // Import Profile.css

const Profile = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchUserRecipes = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/users/${user._id}/recipes`, {
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
    <div className="profile-container"> {/* Apply profile-container class */}
      <div className="profile-content"> {/* Apply profile-content class */}
        <h2>Welcome, {user ? user.username : 'Guest'}</h2>
        <h3>Your Selected Recipes</h3>
        <ul>
          {recipes.map(recipe => (
            <li key={recipe._id}>
              <h4>{recipe.name}</h4>
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
        <Link to="/recipes">Go to Recipe Page</Link> {/* Link to navigate to Recipe Page */}
      </div>
    </div>
  );
};

export default Profile;
