// src/components/OrderSummary.jsx
import React from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import api from '../api/axios'; // Use the central api instance
import './OrderSummary.css';

const OrderSummary = ({ orderItems, bookingId }) => {
  const stripe = useStripe();

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleConfirmPreOrder = async () => {
    // 1. Guard against Stripe not being loaded
    if (!stripe) {
      console.error("Stripe.js has not yet loaded.");
      alert("Payment service is not ready, please wait a moment and try again.");
      return;
    }

    try {
      // 2. Call your backend to create the session
      // --- THIS IS THE CORRECTED LINE ---
      const response = await api.post('/api/payments/create-checkout-session', {
        items: orderItems,
        bookingId: bookingId
      });
      // ---------------------------------

      const { id: sessionId } = response.data;

      // 3. Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      // 4. Handle any errors that occur during the redirect
      if (error) {
        console.error('Stripe redirect error:', error);
        alert(`Payment failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Could not initiate payment. Please check the console and contact support.');
    }
  };

  if (orderItems.length === 0) {
    return null;
  }

  return (
    <div className="order-summary">
      <h3>Your Pre-Order</h3>
      <ul>
        {orderItems.map((item) => (
          <li key={item.id}>
            <span>{item.name} (x{item.quantity})</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="order-total">
        <strong>Total: ${calculateTotal()}</strong>
      </div>
      <button className="confirm-preorder-btn" onClick={handleConfirmPreOrder}>
        Pay & Confirm Order
      </button>
    </div>
  );
};

export default OrderSummary;