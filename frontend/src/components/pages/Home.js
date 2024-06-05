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
          {/* Add more navigation links */}
        </ul>
      </nav>
    </div>
  );
};

export default Homepage;
