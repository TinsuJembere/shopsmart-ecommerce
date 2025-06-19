const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, updateCartQuantity } = require('../controllers/cart.controller');
const protect = require('../middlewares/authMiddleware');

// Get Cart
router.get('/', protect, getCart);

// Add Item to Cart
router.post('/addToCart', protect, addToCart);

router.delete('/remove/:productId', protect, removeFromCart);

router.put('/update', protect, updateCartQuantity);

module.exports = router;
