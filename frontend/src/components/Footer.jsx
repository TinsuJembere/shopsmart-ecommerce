import React from "react";
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-10 px-4">
      {/* Newsletter Section */}
       <div className="flex flex-col items-center mb-10">
        <h2 className="text-lg font-semibold mb-4">
          Subscribe to our newsletter
        </h2>
        <div className="flex border border-zinc-400 rounded-full overflow-hidden">
          <div className="flex items-center px-4 text-gray-300">
            <span className="text-xl">
              <FaEnvelope />
            </span>
          </div>
          <input
            type="email"
            placeholder="Input your email"
            className="bg-transparent px-4 py-2 focus:outline-none w-60 text-white"
          />
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 text-sm font-medium">
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 items-center text-sm pt-10">
        {/* Logo + Dropdown */}
        <div className="flex flex-col gap-4 items-start md:items-start">
          <div className="flex items-center gap-2 text-xl font-bold">
            <img
              src="src/assets/images/newslater.png"
              alt=""
              className="w-6 h-6"
            />
            ShopSmart
          </div>
          
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {[
            "Pricing",
            "About us",
            "Features",
            "Help Center",
            "Contact us",
            "FAQs",
            "Careers",
          ].map((link) => (
            <a key={link} href="#" className="hover:underline text-white">
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="text-center text-xs text-gray-500 border-t-1 border-white mt-10 pt-10 grid grid-cols-3">
      <select className="bg-zinc-800 border border-zinc-600 rounded px-3 py-2 w-40 text-white">
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
          <p>
          © 2024 Brand, Inc. • <a href="#">Privacy</a> • <a href="#">Terms</a> •{" "}
          <a href="#">Sitemap</a>
          </p>
        {/* Socials */}
        <div className="flex justify-end gap-4 text-lg">
          <a href="#" className="text-sky-400 hover:text-white">
            <FaTwitter />
          </a>
          <a href="#" className="text-blue-600 hover:text-white">
            <FaFacebookF />
          </a>
          <a href="#" className="text-blue-500 hover:text-white">
            <FaLinkedinIn />
          </a>
          <a href="#" className="text-red-500 hover:text-white">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
