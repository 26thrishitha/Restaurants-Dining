// src/pages/MenuPage.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Make sure this is imported
import MenuItem from '../components/MenuItem';
import OrderSummary from '../components/OrderSummary';
import './MenuPage.css';

// MOCK DATA: Replace with an API call later
const mockMenu = [
  { id: 1, name: 'Paneer Tikka', description: 'Grilled cottage cheese skewers.', price: 12.99, category: 'Appetizer', imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.uxZyx2BrmtT4eMIt88GfnAHaHa?pid=Api&P=0&h=220' },
  { id: 2, name: 'Butter Chicken', description: 'Creamy and rich chicken curry.', price: 18.50, category: 'Main Course', imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.hcWbNbOAci5jAXs1OPrs1AHaLH?pid=Api&P=0&h=220' },
  { id: 3, name: 'Dal Makhani', description: 'Slow-cooked black lentils.', price: 15.00, category: 'Main Course', imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.JHUn6wAFcMExk2NninHYkwHaJ4?pid=Api&P=0&h=220' },
  { id: 4, name: 'Garlic Naan', description: 'Soft flatbread with garlic.', price: 4.50, category: 'Breads', imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.96dIhfm_h8ExAzkQJURfuQHaJQ?pid=Api&P=0&h=220' },
];

const MenuPage = () => {
  // --- ADD THIS LOGIC ---
  const location = useLocation(); // Get the current location object
  // Extract bookingId from the state passed during navigation, provide an empty object as a fallback
  const { bookingId } = location.state || {};
  // -----------------------

  const [orderItems, setOrderItems] = useState([]);

  const handleAddToOrder = (itemToAdd) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        // If item already exists, just increase its quantity
        return prevItems.map((item) =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Otherwise, add the new item with quantity 1
        return [...prevItems, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  return (
    <div className="menu-page">
      <div className="menu-list">
        <h1>Our Menu</h1>
        {mockMenu.map((item) => (
          <MenuItem key={item.id} item={item} onAddToOrder={handleAddToOrder} />
        ))}
      </div>
      <div className="summary-container">
        {/* --- UPDATE THIS LINE --- */}
        {/* Pass the extracted bookingId to the OrderSummary component */}
        <OrderSummary orderItems={orderItems} bookingId={bookingId} />
        {/* ------------------------ */}
      </div>
    </div>
  );
};

export default MenuPage;