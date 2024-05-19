import React, { createContext, useContext, useState } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));

  const login = (token) => {
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const setAuthToken = (token) => {
  if (token) {
    sessionStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    sessionStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

// Set the auth header on initialization if token exists
const token = sessionStorage.getItem('token');
if (token) {
  setAuthToken(token);
}
