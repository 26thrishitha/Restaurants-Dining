// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate(); // <-- Initialize the hook
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '18:00',
    partySize: 2,
  });

  const handleInputChange = (e) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFindTable = (e) => {
    e.preventDefault();
    // Navigate to the selection page and pass the form data in the state
    navigate('/select-table', { state: { bookingDetails } });
  };

  // ... rest of the component is the same ...
  return (
    <div className="homepage-container">
      <header className="hero-section">
        {/* Replace with a real image path in your assets folder */}
        <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9" alt="Restaurant Interior" style={{width: '100%', height: '400px', objectFit: 'cover'}}/>
        <h1>Miss Mom’s Magic in the Kitchen? Table Booked, Magic Served!</h1>
        <p>Experience the finest dining in Konaseema🌴🌴.</p>
        <div className="booking-widget">
          <form onSubmit={handleFindTable}>
            <input
              type="date"
              name="date"
              value={bookingDetails.date}
              onChange={handleInputChange}
              required
            />
            <select name="time" value={bookingDetails.time} onChange={handleInputChange}>
              <option value="18:00">6:00 PM</option>
              <option value="18:30">6:30 PM</option>
              <option value="19:00">7:00 PM</option>
              <option value="19:30">7:30 PM</option>
              <option value="20:00">8:00 PM</option>
            </select>
            <input
              type="number"
              name="partySize"
              min="1"
              max="10"
              value={bookingDetails.partySize}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Find a Table</button>
          </form>
        </div>
      </header>
    </div>
  );
};

export default HomePage;