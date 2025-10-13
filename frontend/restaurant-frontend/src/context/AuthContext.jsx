// // // src/context/AuthContext.jsx
// // import React, { createContext, useState, useContext, useEffect } from 'react';
// // import axios from 'axios';

// // const AuthContext = createContext(null);

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true); // To handle initial page load check

// //   useEffect(() => {
// //     // Check if a token exists in localStorage on initial load
// //     const token = localStorage.getItem('authToken');
// //     if (token) {
// //       // Here you would typically verify the token with the backend
// //       // For simplicity, we'll just assume the token means we are logged in
// //       // A better implementation would be to fetch user data with the token
// //       setUser({ token }); // A minimal user object
// //     }
// //     setLoading(false);
// //   }, []);

// //   const login = async (email, password) => {
// //     // This function will be called from the LoginPage
// //     // In a real app, you would make an API call to your backend
// //     console.log('Logging in with:', email, password);
// //     // const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
// //     // const { token } = response.data;

// //     // MOCK LOGIN FOR NOW:
// //     const token = 'fake_jwt_token'; // Replace with real token from backend
// //     localStorage.setItem('authToken', token);
// //     setUser({ token });
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('authToken');
// //     setUser(null);
// //   };

// //   const value = { user, login, logout, isAuthenticated: !!user };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // };

// // // Custom hook to easily use the auth context in other components
// // export const useAuth = () => {
// //   return useContext(AuthContext);
// // };




// // src/context/AuthContext.jsx
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import api from '../api/axios';


// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       // In a real app, you would verify this token with a '/api/auth/me' route
//       // For now, we set the user and the default axios header
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       setUser({ token });
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     // --- REPLACE MOCK LOGIC WITH REAL API CALL ---
//     try {
//       // const apiUrl = 'http://localhost:4000/api/auth/login';
//       // const response = await axios.post(apiUrl, { email, password });

//       const response = await api.post('/api/auth/login', { email, password });
      
//       const { token } = response.data;
      
//       // Store the token
//       localStorage.setItem('authToken', token);
      
//       // Set the Authorization header for all subsequent axios requests
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//       // Update the user state
//       setUser({ token });
//     } catch (error) {
//       // If login fails, remove any old tokens and re-throw the error
//       logout(); 
//       throw error;
//     }
//     // --------------------------------------------
//   };

//   const logout = () => {
//     localStorage.removeItem('authToken');
//     // Remove the Authorization header
//     delete axios.defaults.headers.common['Authorization'];
//     setUser(null);
//   };

//   const value = { user, login, logout, isAuthenticated: !!user };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };











// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token });
    } catch (error) {
      logout();
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = { user, login, logout, isAuthenticated: !!user };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider> // <-- THIS IS THE FIXED LINE
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};