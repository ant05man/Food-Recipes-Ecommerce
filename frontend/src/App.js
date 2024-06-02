import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import RecipePage from './components/pages/RecipePage';
import RecipeDetailPage from './components/pages/RecipeDetailPage';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { AuthProvider } from './components/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/recipes" component={RecipePage} />
        <Route path="/recipes/:id" component={RecipeDetailPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    </AuthProvider>
  );
};

export default App;
