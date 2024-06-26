import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import MealPlanner from './components/pages/MealPlanner';
import RecipePage from './components/pages/RecipePage';
import RecipeDetailPage from './components/pages/RecipeDetailPage';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
import Navbar from './components/pages/Navbar';
import { AuthProvider } from './components/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Navbar /> {/* Ensure Navbar is here */}
      <div className="main-content"> {/* Optional container for page content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipePage />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="/mealplanner" element={<MealPlanner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
