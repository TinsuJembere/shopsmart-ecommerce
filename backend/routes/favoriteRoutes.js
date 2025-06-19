const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favorites.controller");
const protect = require("../middlewares/authMiddleware");  // Ensure this is in place for protected routes.

// Add product to favorites
router.post("/add", protect, favoritesController.addToFavorites);

// Remove product from favorites
router.delete("/remove/:productId", protect, favoritesController.removeFromFavorites);

// Get all favorites for a user
router.get("/", protect, favoritesController.getFavorites);

module.exports = router;
