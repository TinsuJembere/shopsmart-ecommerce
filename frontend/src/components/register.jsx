import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("https://shopsmart-ecommerce.onrender.com/api/users/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Registered successfully!");

      // Extract token and user from response
      const { token, user } = response.data;

      // Combine user info with token

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-white min-h-screen flex">
      {/* Left Side */}
      <div className="relative w-1/2 bg-gray-100 hidden md:flex items-center justify-center overflow-hidden">
        <img
          src="src/assets/images/registerbg.jpg"
          alt="Working Online"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 p-8 text-white bg-gradient-to-t from-black/80 to-transparent w-full">
          <blockquote className="text-xl italic font-semibold mb-2">
            Think Smart. ShopSmart.
          </blockquote>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="md:w-1/2 w-full flex flex-col justify-center py-3 px-8 sm:px-12 lg:px-24">
        <div className="mb-3">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome to ShopSmart
          </h2>
          <p className="text-gray-600 mt-1">
            Shop smarter, not harder — discover unbeatable deals and a seamless
            shopping experience, all in one place.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-3 sm:text-sm"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-3 sm:text-sm"
              placeholder="johndoe@gmail.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-3 sm:text-sm"
              placeholder="********"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-3 sm:text-sm"
              placeholder="********"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Create account
            </button>
          </div>
        </form>

        <div className="mt-3 relative text-sm text-gray-500 text-center">
          OR
        </div>

        <div className="mt-3">
          <button
            type="button"
            className="w-full inline-flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50"
          >
            <FaGoogle className="h-5 w-5 mr-2 text-[#4285F4]" />
            Sign up with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
