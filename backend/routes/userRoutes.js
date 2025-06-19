const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUser, deleteUser } = require('../controllers/user.controller');
const protect = require('../middlewares/authMiddleware'); // JWT validation middleware

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);

// Get User Profile
router.get('/profile', protect, getUserProfile);

router.put('/:id', protect, updateUser);

router.delete('/:id', protect, deleteUser);

module.exports = router;
