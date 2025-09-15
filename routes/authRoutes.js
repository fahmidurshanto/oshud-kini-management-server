const express = require('express');
const router = express.Router();
const { register, login, logout, getCurrentUser, sendOTP, verifyOTP } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// Protected routes
router.get('/me', authenticateToken, getCurrentUser);

module.exports = router;