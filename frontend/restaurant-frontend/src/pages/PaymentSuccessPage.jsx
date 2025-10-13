import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentStatus.css';

const PaymentSuccessPage = () => {
  return (
    <div className="payment-status-container success">
      <h2>✅ Payment Successful!</h2>
      <p>Your pre-order has been confirmed. We look forward to seeing you!</p>
      <Link to="/" className="status-link">Back to Home</Link>
    </div>
  );
};

export default PaymentSuccessPage; // <-- ADD THIS LINE