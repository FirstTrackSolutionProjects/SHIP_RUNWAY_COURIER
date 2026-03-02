import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaDoorOpen } from "react-icons/fa";
const Sidebar = ({ isOpen, setIsOpen, 
  isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

   const onShipRunwayClick = () => {
    handleLogout(); 
    setIsOpen(false); 
    navigate('/'); 
  };

 return (
  <div
    className={`fixed top-0 right-0 h-full w-64 bg-[#0a0a0a] shadow-2xl transform transition-transform duration-300 z-50 ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    {/* Header */}
    <div className="p-5 border-b border-gray-800 flex justify-between items-center">
      <h2 className="text-2xl font-semibold text-white tracking-wide">
        Menu
      </h2>
      <button
        onClick={() => setIsOpen(false)}
        className="text-white text-xl hover:text-yellow-500 transition"
      >
        ✕
      </button>
    </div>

    {/* Navigation */}
    <nav className="flex flex-col p-6 gap-5 text-white text-[15px] font-medium">

      <Link
        to="/"
        onClick={() => setIsOpen(false)}
        className="hover:text-yellow-500 transition duration-200"
      >
        Home
      </Link>

      <Link
        to="/about-us"
        onClick={() => setIsOpen(false)}
        className="hover:text-yellow-500 transition duration-200"
      >
        About
      </Link>

      <Link
        to="/blog"
        onClick={() => setIsOpen(false)}
        className="hover:text-yellow-500 transition duration-200"
      >
        Blog
      </Link>

      <Link
        to="/contact-us"
        onClick={() => setIsOpen(false)}
        className="hover:text-yellow-500 transition duration-200"
      >
        Contact
      </Link>

    
    </nav>
  </div>
);
};

export default Sidebar;
