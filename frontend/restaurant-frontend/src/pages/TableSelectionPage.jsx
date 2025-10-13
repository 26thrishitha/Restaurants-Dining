// src/pages/TableSelectionPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import TableLayout from '../components/TableLayout';

const TableSelectionPage = () => {
  const location = useLocation();
  const { bookingDetails } = location.state || {}; // Get the state passed from HomePage

  if (!bookingDetails) {
    return <div>Please go back to the homepage and select your details first.</div>;
  }

  return (
    <div>
      <TableLayout bookingDetails={bookingDetails} />
    </div>
  );
};

export default TableSelectionPage;