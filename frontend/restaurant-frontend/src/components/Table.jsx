// src/components/Table.jsx
import React from 'react';
import './Table.css';

const Table = ({ table, onSelectTable, isSelected }) => {
  const getStatusClass = () => {
    if (isSelected) return 'selected';
    return table.status; // 'available' or 'booked'
  };

  return (
    <div
      className={`table ${getStatusClass()}`}
      onClick={() => table.status === 'available' && onSelectTable(table.tableNumber)}
    >
      <div className="table-number">{table.tableNumber}</div>
      <div className="table-capacity">Seats: {table.capacity}</div>
    </div>
  );
};

export default Table;