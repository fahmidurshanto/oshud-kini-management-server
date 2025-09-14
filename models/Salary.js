const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
    trim: true
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  processedDate: {
    type: Date,
    required: true
  },
  employeeCount: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Salary', salarySchema);