// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import MealPlanner from './components/pages/MealPlanner';
import RecipePage from './components/pages/RecipePage';
import RecipeDetailPage from './components/pages/RecipeDetailPage';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile'; // Import Profile component
import { AuthProvider } from './components/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipePage />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="/mealplanner" element={<MealPlanner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
