// src/components/OrderSummary.jsx
import React from 'react';
import { useStripe } from '@stripe/react-stripe-js'; // <-- Import the hook
import axios from 'axios'; // Make sure axios is installed
import './OrderSummary.css';

const OrderSummary = ({ orderItems, bookingId }) => { // <-- Pass bookingId as a prop
  const stripe = useStripe(); // <-- Get the Stripe instance

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
      const response = await axios.post('http://localhost:4000/api/payments/create-checkout-session', {
        items: orderItems,
        bookingId: bookingId
      });

      const { id: sessionId } = response.data;

      // 3. This is the standard, correct way to redirect to Stripe Checkout
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


















  // const handleConfirmPreOrder = async () => {
  //   if (!stripe) {
  //     console.error("Stripe.js has not yet loaded.");
  //     return;
  //   }

  //   try {
  //     // 1. Send the order details to YOUR backend to create a checkout session
  //     const response = await axios.post('http://localhost:4000/api/payments/create-checkout-session', {
  //       items: orderItems,
  //       bookingId: bookingId
  //     });

  //     const { id: sessionId } = response.data;

  //     // 2. Redirect the user to Stripe Checkout using the session ID
  //     const { error } = await stripe.redirectToCheckout({
  //       sessionId,
  //     });

  //     if (error) {
  //       console.error('Error redirecting to Stripe Checkout:', error);
  //       alert('Payment failed. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error creating checkout session:', error);
  //     alert('Could not initiate payment. Please try again later.');
  //   }
  // };















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