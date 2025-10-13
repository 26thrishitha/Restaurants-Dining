// // src/pages/RegisterPage.jsx

// import React, { useState } from 'react'; // <-- THIS LINE IS FIXED
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import './AuthPages.css';

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log('Registering user with:', formData);
//       alert('Registration successful! Please log in.');
//       navigate('/login');
//     } catch (error) {
//       console.error('Failed to register:', error);
//       alert('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form onSubmit={handleSubmit} className="auth-form">
//         <h2>Create Account</h2>
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Register</button>
//         <p className="auth-switch-link">
//           Already have an account? <Link to="/login">Log In</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;








// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported
import './AuthPages.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // --- REPLACE MOCK LOGIC WITH REAL API CALL ---
      const apiUrl = 'http://localhost:4000/api/auth/register';
      await axios.post(apiUrl, formData);
      
      alert('Registration successful! Please log in to continue.');
      navigate('/login');
      // ---------------------------------------------
    } catch (error) {
      // --- IMPROVED ERROR HANDLING ---
      console.error('Failed to register:', error);
      // Check if the server sent a specific error message
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      alert(message);
      // -----------------------------
    }
  };

  // ... The rest of the return JSX is the same
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Create Account</h2>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Register</button>
        <p className="auth-switch-link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;