import React, { useEffect, useState } from "react";
import FilterOptions from "../components/FilterOptions";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 20;

  const fetchProducts = async () => {
    try {
      const query = selectedCategories
        .map((cat) => `category=${encodeURIComponent(cat)}`)
        .join("&");

      const res = await axios.get(
        `https://shopsmart-ecommerce.onrender.com/api/products?page=${page}&limit=${limit}&${query}`
      );

      setProducts(res.data.products);
      setTotalProducts(res.data.total);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://shopsmart-ecommerce.onrender.com/api/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(res.data.map((fav) => fav._id));
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategories, page]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleFilterChange = (categories) => {
    setSelectedCategories(categories);
    setPage(1); 
  };

  const toggleFavorite = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      if (favorites.includes(productId)) {
        await axios.delete(`https://shopsmart-ecommerce.onrender.com/api/favorites/remove/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(favorites.filter((id) => id !== productId));
      } else {
        await axios.post(
          "https://shopsmart-ecommerce.onrender.com/api/favorites/add",
          { productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFavorites([...favorites, productId]);
      }
    } catch (err) {
      console.error("Favorite toggle error:", err);
    }
  };

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://shopsmart-ecommerce.onrender.com/api/cart/addToCart",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`${product.name} added to cart.`);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add item to cart.");
    }
  };

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div>
      <Navbar />
      <FilterOptions onFilterChange={handleFilterChange} />
      <div className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Product Grid
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="relative bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFavorite(product._id)}
                  className="absolute top-2 right-2 text-2xl cursor-pointer"
                  title="Toggle Favorite"
                >
                  <span className={favorites.includes(product._id) ? "text-yellow-400" : "text-yellow-400"}>
                    {favorites.includes(product._id) ? "★" : "☆"}
                  </span>
                </button>

                <img
                  src={`https://shopsmart-ecommerce.onrender.com/${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-1">{product.description}</p>
                  <p className="text-gray-800 font-semibold">${product.price}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              ← Prev
            </button>
            <span className="text-gray-700 font-medium">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductsList;
