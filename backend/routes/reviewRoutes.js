const express = require('express');
const router = express.Router();
const { addReview, getProductReviews } = require('../controllers/review.controller');
const protect = require('../middlewares/authMiddleware');

// Add a Review
router.post('/:productId/review', protect, addReview);

// Get all Reviews for a Product
router.get('/:productId/reviews', getProductReviews);

module.exports = router;
