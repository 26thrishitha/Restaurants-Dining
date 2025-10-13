// models/Table.js
const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  location: {
    type: String, // e.g., 'Window', 'Patio', 'Indoor'
    default: 'Indoor',
  },
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;