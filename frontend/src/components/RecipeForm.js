import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecipeForm = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState('');
  const [user, setUser] = useState(''); // Still handle user for logged-in users
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/recipes', {
        name,
        ingredients,
        instructions,
        user: user || undefined // Omit user if it's empty
      });
      navigate('/recipes');
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  const handleIngredientsChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Ingredients:</label>
        {ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            value={ingredient}
            onChange={(e) => handleIngredientsChange(index, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={() => setIngredients([...ingredients, ''])}>Add Ingredient</button>
      </div>
      <div>
        <label>Instructions:</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required></textarea>
      </div>
      <div>
        <label>User ID (optional):</label>
        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
      </div>
      <button type="submit">Create Recipe</button>
    </form>
  );
};

export default RecipeForm;
