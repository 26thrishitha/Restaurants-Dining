// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  
  // **Ensure default values are set correctly on initial load**
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '18:00',      // Default time
    partySize: 2,       // Default party size
  });

  const handleInputChange = (e) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFindTable = (e) => {
    e.preventDefault();
    if (!bookingDetails.date) {
      alert('Please select a date to find a table.');
      return;
    }
    // Navigate to the selection page, passing the complete state
    navigate('/select-table', { state: { bookingDetails } });
  };

  return (
    <div className="homepage-container">
      <header className="hero-section">
        <h1>Tables Are Waiting… Your Appetite Too!</h1>
        <p>Experience the finest dining in Konaseema.🌴🌴🌴</p>
        <div className="booking-widget">
          <form onSubmit={handleFindTable}>
            <input
              type="date"
              name="date"
              value={bookingDetails.date}
              onChange={handleInputChange}
              required
            />
            {/* **The `value` prop makes this a "controlled component"** */}
            <select name="time" value={bookingDetails.time} onChange={handleInputChange}>
              <option value="18:00">6:00 PM</option>
              <option value="18:30">6:30 PM</option>
              <option value="19:00">7:00 PM</option>
              <option value="19:30">7:30 PM</option>
              <option value="20:00">8:00 PM</option>
            </select>
            {/* **The `value` prop makes this a "controlled component"** */}
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