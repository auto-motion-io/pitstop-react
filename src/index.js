import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/navbar/NavBar';
import "./utils/global.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar nome={"Kauã"} />
  </React.StrictMode>
);