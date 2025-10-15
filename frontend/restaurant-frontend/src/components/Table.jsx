// src/components/Table.jsx
import React from 'react';
import './Table.css';

const Table = ({ table, onSelectTable, isSelected }) => {
  const statusClass = isSelected ? 'selected' : 'available';

  return (
    <div
      className={`table-representation ${statusClass}`}
      onClick={() => onSelectTable(table._id)}
    >
      <div className="table-name">{table.tableName}</div>
      <div className="table-capacity">Seats: {table.capacity}</div>
    </div>
  );
};

export default Table;