const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // Add cookie-parser

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser()); // Add cookie-parser middleware
app.use(cors({
    origin: "https://oshud-kini-managment-system.vercel.app",
    credentials: true  // Allow credentials (cookies)
}));
app.use(express.json());

// MongoDB connection with better error handling
let mongoConnected = false;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/oshud-kini-management');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    mongoConnected = true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Please make sure MongoDB is running on your system.');
    console.log('You can start MongoDB by running "mongod" in a separate terminal.');
    console.log('Server will start without database connection, but some features may not work.');
    mongoConnected = false;
  }
};

// Connect to MongoDB
connectDB();

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const salaryRoutes = require('./routes/salaryRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const salesRoutes = require('./routes/salesRoutes');
const expenseRoutes = require('./routes/expenseRoutes'); // Add expense routes

// Import middleware
const authenticateToken = require('./middleware/authMiddleware');

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Oshud Kini Management Server is running!',
    mongodb: mongoConnected ? 'Connected' : 'Disconnected'
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Public routes (without authentication)
app.use('/api/products', productRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/salaries', salaryRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/expenses', expenseRoutes); // Add expense routes

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server regardless of MongoDB connection status
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`CORS enabled for https://oshud-kini-managment-system.vercel.app with credentials support`);
  if (!mongoConnected) {
    console.log('Warning: MongoDB is not connected. Some features may not work properly.');
  }
});