// src/components/TableLayout.jsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios'; // Import axios
import { useAuth } from '../context/AuthContext';
import Table from './Table';
import './TableLayout.css';
import api from '../api/axios';

const TableLayout = ({ bookingDetails }) => {
  // State for tables, loading, and errors
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedTable, setSelectedTable] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // useEffect to fetch tables when the component mounts or bookingDetails change
  useEffect(() => {
    const fetchAvailableTables = async () => {
      if (!bookingDetails.date || !bookingDetails.time) {
        setError('Please select a date and time.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError('');
        const { date, time, partySize } = bookingDetails;
        
        // Call the backend API to get available tables
        // const apiUrl = `http://localhost:4000/api/bookings/availability?date=${date}&time=${time}&partySize=${partySize}`;
        // const response = await axios.get(apiUrl);

        const response = await api.get(`/api/bookings/availability?date=${date}...`);

        // We need to add a 'status' to the tables returned from the API
        const availableTables = response.data.map(table => ({ ...table, status: 'available' }));
        setTables(availableTables);

      } catch (err) {
        console.error("Error fetching tables:", err);
        setError('Could not fetch tables. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableTables();
  }, [bookingDetails]); // Re-run this effect if bookingDetails change

  const handleSelectTable = (tableId) => {
    setSelectedTable(tableId);
  };
  
  // The handleConfirmBooking function will be updated in the next step
  // Inside the TableLayout component in src/components/TableLayout.jsx

const handleConfirmBooking = async () => {
    if (!selectedTable) {
      alert('Please select a table first.');
      return;
    }

    if (!isAuthenticated) {
      alert('Please log in to confirm your booking.');
      navigate('/login', { state: { from: location } });
      return;
    }
    
    try {
      // Prepare the data to send to the backend
      const bookingData = {
        tableId: selectedTable,
        bookingDate: bookingDetails.date,
        bookingTime: bookingDetails.time,
        partySize: bookingDetails.partySize,
      };

      // The JWT token is automatically added to the header by our axios setup in AuthContext
      // const apiUrl = 'http://localhost:4000/api/bookings';
      // const response = await axios.post(apiUrl, bookingData);

      const response = await api.post('/api/bookings', bookingData);
      
      const { _id: bookingId } = response.data; // Get the new booking ID

      // Ask the user if they want to pre-order
      if (window.confirm('Table booking confirmed! Would you like to pre-order your meal now?')) {
        navigate('/menu', { state: { bookingId } });
      } else {
        alert('Your booking is confirmed. You can view it in your profile.');
        navigate('/'); // Or navigate to a profile page
      }

    } catch (error) {
      console.error('Booking failed:', error);
      const message = error.response?.data?.message || 'Booking failed. Please try again.';
      alert(message);
    }
  };

  // Render loading state
  if (loading) {
    return <div className="loading-message">Finding available tables...</div>;
  }
  
  // Render error state
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="table-layout-container">
      <h2>Select Your Table</h2>
      <p>
        Showing tables for <strong>{bookingDetails.partySize} people</strong> on{' '}
        <strong>{bookingDetails.date}</strong> at <strong>{bookingDetails.time}</strong>.
      </p>
      
      {tables.length > 0 ? (
        <>
          <div className="tables-grid">
            {tables.map((table) => (
              <Table
                key={table._id}
                table={table}
                onSelectTable={() => handleSelectTable(table._id)}
                isSelected={selectedTable === table._id}
              />
            ))}
          </div>
          <button 
            className="confirm-booking-btn" 
            onClick={handleConfirmBooking}
            disabled={!selectedTable}
          >
            Confirm Booking for selected table
          </button>
        </>
      ) : (
        <p className="no-tables-message">Sorry, no tables are available for the selected time and party size.</p>
      )}
    </div>
  );
};

export default TableLayout;