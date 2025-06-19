const express = require('express');
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFeatured
} = require('../controllers/product.controller');
const protect = require('../middlewares/authMiddleware');

router.post('/', addProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);
router.get("/new/featured", getFeatured)

module.exports = router;
