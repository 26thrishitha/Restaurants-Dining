// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Stripe Imports
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Import all your components and pages
import Navbar from './components/Navbar'; // <-- THE MISSING IMPORT
import HomePage from './pages/HomePage';
import TableSelectionPage from './pages/TableSelectionPage';
import MenuPage from './pages/MenuPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// App.jsx
import PaymentSuccessPage from './pages/PaymentSuccessPage';
// App.jsx
import PaymentCancelPage from './pages/PaymentCancelPage';
// import ParticlesBackground from './components/ParticlesBackground';
import ParticlesBackground from './components/ParticlesBackground';


const stripePromise = loadStripe('pk_test_51SHMaEAAZpj2wMBMpPOhLRKSfRa6eaPSRUlVkGOUAWanAov9kWX9DmLXmUDOY9tywuKgh9tgEYSCA2ddQrENoh3T00VUkJGvei');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <ParticlesBackground />
        <Navbar /> {/* This line can now find the Navbar component */}
        
        <main className="main-content">
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/select-table" element={<TableSelectionPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
           <Route path="/payment-cancel" element={<PaymentCancelPage />} />
          </Routes>
        </main>
      </div>
     </Elements>
  );
}

export default App;