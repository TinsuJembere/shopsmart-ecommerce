const Favorite = require('../models/favorites');
const Product = require('../models/product');  

// Add product to favorites
exports.addToFavorites = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id; 

  try {
    const existingFavorite = await Favorite.findOne({ userId, productId });
    if (existingFavorite) {
      return res.status(400).json({ message: "Product already in favorites" });
    }

    const newFavorite = new Favorite({
      userId,
      productId,
    });

    await newFavorite.save();
    res.status(201).json({ message: "Product added to favorites", favorite: newFavorite });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Remove product from favorites
exports.removeFromFavorites = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id; 

  try {
    const favorite = await Favorite.findOneAndDelete({ userId, productId });
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    res.json({ message: "Product removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get all favorite products of a user
exports.getFavorites = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const favorites = await Favorite.find({ userId }).populate("productId");
  
      if (!favorites || favorites.length === 0) {
        return res.status(404).json({ message: "No favorites found" });
      }
  
      const favoriteProducts = favorites.map(fav => fav.productId);
  
      res.json(favoriteProducts); 
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  };
  
