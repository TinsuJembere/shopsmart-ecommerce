const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, updateOrder, deleteOrder, getOrderById } = require('../controllers/order.controller');
const protect = require('../middlewares/authMiddleware');

// Create an Order
router.post('/', protect, createOrder);

// Get User's Orders
router.get('/', protect, getUserOrders);

router.put('/:id', protect, updateOrder);

router.delete('/:id', protect, deleteOrder);

router.get('/:id', protect, getOrderById);


module.exports = router;
