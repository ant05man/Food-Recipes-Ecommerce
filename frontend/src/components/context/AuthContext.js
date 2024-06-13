import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data if authenticated (runs once on component mount)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/profile');
        setUser(response.data); // Assuming response.data contains user information
      } catch (error) {
        setUser(null); // Clear user on error
      } finally {
        setLoading(false); // Update loading state after fetch completes
      }
    };

    fetchUser(); // Initial fetch on component mount
  }, []); // Empty dependency array for one-time effect

  // Handle user login
  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      setUser(response.data.user); // Update user state
      return response.data.user; // Return user data for component handling
    } catch (error) {
      console.error('Login failed:', error); // Log error to console
      throw error; // Rethrow error for further handling
    }
  };

  // Handle user registration
  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      setUser(response.data.user); // Update user state
      return response.data.user; // Return user data for component handling
    } catch (error) {
      console.error('Registration failed:', error); // Log error to console
      throw error; // Rethrow error for further handling
    }
  };

  // Handle user logout
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null); // Clear user state
    } catch (error) {
      console.error('Logout failed:', error); // Log error to console
      throw error; // Rethrow error for further handling
    }
  };

  // Provide user, loading state, login, register, and logout functions to context
  const authContextValue = {
    user,
    loading,
    login,
    register,
    logout
  };

  // Provide auth context value to children components
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
