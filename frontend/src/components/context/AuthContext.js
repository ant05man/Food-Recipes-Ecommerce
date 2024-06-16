// AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage for token and set user if token exists
    const token = localStorage.getItem('token');
    if (token) {
      // Assuming fetchUserDetails fetches user details from backend based on token
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      // Make a request to your backend to fetch user details using the token
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData); // Set the user state with fetched user data
      } else {
        setUser(null); // Clear user state if token is invalid or user not found
        localStorage.removeItem('token'); // Remove invalid token from localStorage
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const login = async ({ email, password }) => {
    try {
      // Perform API call to authenticate user
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token); // Store token in localStorage
        fetchUserDetails(token); // Fetch user details after successful login
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setUser(null); // Clear user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
