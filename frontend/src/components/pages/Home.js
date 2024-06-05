// Homepage.js

import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <h1>Welcome to My Recipe App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/mealplanner">Meal Planner</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
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
