// src/components/MenuItem.jsx
import React from 'react';
import './MenuItem.css';

const MenuItem = ({ item, onAddToOrder }) => {
  return (
    <div className="menu-item-card">
      <img src={item.imageUrl} alt={item.name} className="menu-item-image" />
      <div className="menu-item-details">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
      <div className="menu-item-actions">
        <span className="menu-item-price">${item.price.toFixed(2)}</span>
        <button onClick={() => onAddToOrder(item)}>Add to Order</button>
      </div>
    </div>
  );
};

export default MenuItem;