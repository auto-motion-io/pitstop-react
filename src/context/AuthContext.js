import React, { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));

  const login = (token, idOficina, email) => {
    if (token && idOficina) {
      setAuthToken(token);
      setAuthIdOficina(idOficina);
      setAuthEmail(email);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    sessionStorage.clear()
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

export const setAuthIdOficina = (idOficina) => {
  if (idOficina) {
    sessionStorage.setItem('idOficina', idOficina);
    api.defaults.headers.common['idOficina'] = idOficina;
  } else {
    sessionStorage.removeItem('idOficina');
    delete api.defaults.headers.common['idOficina'];
  }
};

export const setAuthEmail = (email) => {
  if (email) {
    sessionStorage.setItem('email', email);
    api.defaults.headers.common['email'] = email;
  } else {
    sessionStorage.removeItem('email');
    delete api.defaults.headers.common['email'];
  }
};

// Set the auth header on initialization if token exists
const token = sessionStorage.getItem('token');
if (token) {
  setAuthToken(token);
}
