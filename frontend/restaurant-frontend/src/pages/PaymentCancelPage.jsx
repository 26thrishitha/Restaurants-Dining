import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentStatus.css';

const PaymentCancelPage = () => {
  return (
    <div className="payment-status-container cancel">
      <h2>❌ Payment Cancelled</h2>
      <p>Your payment was not completed. Your table is still booked, but your food order was not placed.</p>
      <Link to="/menu" className="status-link">Try Again</Link>
      <Link to="/" className="status-link">Back to Home</Link>
    </div>
  );
};

export default PaymentCancelPage; // <-- ADD THIS LINE