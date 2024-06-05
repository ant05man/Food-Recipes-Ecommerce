// MealPlanner.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState([]);

  useEffect(() => {
    // Fetch meal planner data from backend API
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get('/api/mealplanner'); // Assuming you have a route for fetching meal planner data
        setMealPlan(response.data);
      } catch (error) {
        console.error('Error fetching meal planner:', error);
      }
    };

    fetchMealPlan();
  }, []);

  return (
    <div className="meal-planner">
      <h1>Meal Planner</h1>
      <div className="meal-plan">
        {mealPlan.map(day => (
          <div key={day.date} className="day">
            <h2>{day.date}</h2>
            <ul>
              {day.meals.map(meal => (
                <li key={meal._id}>
                  <Link to={`/recipes/${meal.recipe._id}`}>{meal.recipe.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link to="/recipes">Browse Recipes</Link>
    </div>
  );
};

export default MealPlanner;
