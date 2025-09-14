const mongoose = require('mongoose');

// Try to connect to MongoDB
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect('mongodb://localhost:27017/oshud-kini-management');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Please make sure MongoDB is installed and running on your system.');
    console.log('You can start MongoDB by running "mongod" in a separate terminal.');
  }
};

connectDB();