import React from 'react';

const RecipeList = ({ recipes }) => {
  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <a href={`/recipes/${recipe.id}`}>{recipe.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
