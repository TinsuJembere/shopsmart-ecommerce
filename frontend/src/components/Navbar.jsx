import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const isActive = (path) => location.pathname === path;

  const getLinkClasses = (path) => {
    const baseClasses = "font-medium hover:text-indigo-500";
    return isActive(path)
      ? `${baseClasses} text-indigo-500 border-b-2 border-indigo-500`
      : `text-gray-600 ${baseClasses}`;
  };

  const getMobileLinkClasses = (path) => {
    const baseClasses = "block py-2 font-medium hover:text-indigo-500";
    return isActive(path)
      ? `${baseClasses} text-indigo-500 border-b-2 border-indigo-500`
      : `text-gray-600 ${baseClasses}`;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("JWT Token:", token);
        const res = await axios.get("https://shopsmart-ecommerce.onrender.com/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        if (res.data.avatar) {
          setAvatar(res.data.avatar);
        }
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setAvatar(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm mb-3">
      <div className="container mx-auto py-4 px-6 hidden md:flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="src/assets/images/newslater.png"
              alt="Logo"
              className="w-6 h-6 mr-2"
            />
            <span className="text-xl font-semibold text-gray-800 mr-10">
              ShopSmart
            </span>
          </Link>

          <div className="hidden md:flex space-x-4">
            <Link to="/" className={getLinkClasses("/")}>Home</Link>
            <Link to="/favorites" className={getLinkClasses("/favorites")}>Favorites</Link>
            <Link to="/products" className={getLinkClasses("/products")}>Products</Link>
            <Link to="/cart" className={getLinkClasses("/cart")}>Cart</Link>
          </div>
        </div>

        <div className="flex gap-8 items-center">
          {user ? (
            <>
              <Link to="/profile" className="cursor-pointer">
                <img
                  src={avatar || "/avatar.avif"} 
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-[#FF6347] hover:bg-red-600 text-white font-semibold rounded-md px-4 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md px-4 py-2">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="border border-indigo-500 hover:bg-indigo-50 text-indigo-500 font-semibold rounded-md px-4 py-2">
                  Sign Up for Free
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-gray-100 py-2 px-6">
        <Link to="/" className={getMobileLinkClasses("/")}>Home</Link>
        <Link to="/favorites" className={getMobileLinkClasses("/favorites")}>Favorites</Link>
        <Link to="/cart" className={getMobileLinkClasses("/cart")}>Cart</Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 rounded-md text-white bg-red-500 hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md px-4 py-2 mt-2">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="w-full border border-indigo-500 text-indigo-500 hover:bg-indigo-50 font-semibold rounded-md px-4 py-2 mt-2">
                Sign Up for Free
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
