import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa'; // Import the React Icons

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container  mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-semibold">
          Your Logo
        </Link>
        <div className=" hidden md:flex space-x-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/about" className="text-white">
            About
          </Link>
          <Link to="/services" className="text-white">
            Services
          </Link>
          <Link to="/login" className="text-white">
            Login
          </Link>
          <Link to="/register" className="text-white">
            Register
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {menuOpen ? (
              <FaTimes size={24} /> // Close icon
            ) : (
              <FaBars size={24} /> // Hamburger icon
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-blue-500 p-4 absolute top-16 left-0 w-48">
          <Link to="/" className="block text-white py-2">
            Home
          </Link>
          <Link to="/about" className="block text-white py-2">
            About
          </Link>
          <Link to="/services" className="block text-white py-2">
            Services
          </Link>
          <Link to="/profile" className="block text-white py-2">
            Profile
          </Link>
          <Link to="/login" className="block text-white py-2">
            Login
          </Link>
          <Link to="/register" className="block text-white py-2">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
