// Homepage.js

import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <h1>Welcome to Food Recipes!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/recipes">Recipe Page</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/create-recipes">Create Recipe</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          {/*  more navigation links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Homepage;
