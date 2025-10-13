// src/api/axios.js
import axios from 'axios';

// Create an instance of axios with a custom configuration
const api = axios.create({
  // Use the environment variable for the base URL
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;