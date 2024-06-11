// context/AuthContext.js

import React, { createContext, useState } from 'react';
import { login as loginService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const userData = await loginService(email, password);
      const userWithEmail = { ...userData, email }; // Include email in the user object
      setUser(userWithEmail);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
