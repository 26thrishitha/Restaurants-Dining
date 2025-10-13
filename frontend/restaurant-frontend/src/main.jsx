// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// This line is crucial. It finds the <div id="root"></div>
const rootElement = document.getElementById('root');

// Make sure you are using ReactDOM.createRoot
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);