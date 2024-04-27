import React from 'react';
import NavBar from './components/navbar/NavBar';
import "./utils/global.css"
import ReactDOM from 'react-dom/client';
import LoginBuscar from './pages/loginBuscar/LoginBuscar'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginBuscar />
  </React.StrictMode>
);