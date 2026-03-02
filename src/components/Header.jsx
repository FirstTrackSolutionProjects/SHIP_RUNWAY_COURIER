import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import WalletRechargeModal from './WalletRechargeModal';
import { FaDoorOpen } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_APP_API_URL;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, name, logout, verified } = useAuth();
  const [showRecharge, setShowRecharge] = useState(false);
  const location = useLocation(); // Get the current location
  const [balance, setBalance] = useState(0.00);

  const closeRechargeModal = () => {
    setShowRecharge(false);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      console.log("Fetching balance");
      try {
        const response = await fetch(`${API_URL}/wallet/balance`, {
          method: 'POST',
          headers: {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json", // Good practice to include
          }
        });
        const result = await response.json();
        if (result.balance !== undefined) { // Check if balance exists in response
          setBalance(result.balance);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
        // Handle error, e.g., show a message to the user
      }
    };

    if (isAuthenticated && verified) {
      fetchBalance();
    }
  }, [isAuthenticated, verified]); // Add verified to dependencies if it can change

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout(); // from useAuth context
    console.log("User logged out");
    // Optionally redirect to login page after logout
    // window.location.href = '/sign-in';
  };

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {showRecharge && <WalletRechargeModal onClose={closeRechargeModal} />}
      <header className="w-full bg-gray-100 sticky top-0 z-50 h-16 flex items-center px-4 shadow">
        <div className="flex items-center justify-between w-full h-full">
          {/* Logo Container (Left Side) */}
          <div className="flex items-center"> {/* Removed flex-1 to let other elements control width */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo 1.png"
                alt="Logo"
                className="h-12 w-auto object-contain"
              />
              <span className="flex items-center gap-1 sm:gap-1.5 text-xl sm:text-2xl font-extrabold tracking-tight">
                <span className="text-brand-green">Ship</span>
                <span className="text-yellow-500">Runway</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation (Middle) */}
          <nav className="hidden md:flex items-center gap-6 font-semibold text-gray-700 flex-1 justify-center"> {/* Added flex-1 and justify-center */}
            <Link to="/" className="relative group">
              <span className="hover:text-brand-orange">Home</span>
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/tracking" className="relative group">
              <span className="hover:text-brand-orange">Tracking</span>
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/pricing" className="relative group">
              <span className="hover:text-brand-orange">Pricing</span>
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about-us" className="relative group">
              <span className="hover:text-brand-orange">About</span>
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/blog" className="relative group">
              <span className="hover:text-brand-orange">Blog</span>
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/contact-us" className="relative group">
              <span className="hover:text-brand-orange">Contact</span>
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="relative group">
                <span className="hover:text-brand-orange">Dashboard</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
            {!isAuthenticated && (
              <Link to="/sign-in" className="relative group">
                <span className="hover:text-brand-orange">Sign In</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </nav>

          {/* Right Section Container (User Info, Wallet, Logout) */}
          <div className="flex items-center gap-3">
            {/* Mobile Right Section (Visible on small screens) */}
            <div className='md:hidden flex items-center gap-2'>
              {isAuthenticated && verified && location.pathname.startsWith('/dashboard') && (
                <div onClick={() => setShowRecharge(true)} className={`relative bg-brand-green ${balance < 250 ? "text-brand-orange" : "text-white"} flex items-center font-bold rounded-lg px-3 py-1.5 cursor-pointer border border-brand-green-light shadow-sm`}>
                  {balance < 250 && <span className="mr-1 text-brand-orange animate-pulse text-sm">⚠️</span>}
                  <p className="text-sm">{`₹${balance}`}</p>
                </div>
              )}
              {isAuthenticated && (
                <span className='bg-red-600 hover:bg-red-700 text-white text-base p-2 cursor-pointer rounded-lg transition-all duration-300 shadow-sm' onClick={handleLogout}>
                  <FaDoorOpen />
                </span>
              )}
            </div>

            {/* Desktop Right Section (Visible on medium and larger screens) */}
            {isAuthenticated && (
              <div className='hidden md:flex items-center space-x-4'>
                {verified && location.pathname.startsWith('/dashboard') && (
                  <div onClick={() => setShowRecharge(true)} className={`relative bg-brand-green ${balance < 250 ? "text-brand-orange" : "text-white"} flex items-center font-bold rounded-xl px-4 py-2 cursor-pointer border border-brand-green-light shadow-sm transition-all duration-300`}>
                    {balance < 250 && <span className="mr-1 text-brand-orange animate-pulse">⚠️</span>}
                    <p>{`₹${balance}`}</p>
                  </div>
                )}
                <div className='flex items-center'>
                  <Link to="/dashboard" className="text-brand-accent font-semibold hover:text-brand-orange transition-colors duration-200">
                    {name}
                  </Link>
                  <span className='bg-red-600 hover:bg-red-700 text-white text-lg p-2.5 cursor-pointer rounded-xl mx-3 transition-all duration-300 shadow-sm' onClick={handleLogout}>
                    <FaDoorOpen />
                  </span>
                </div>
              </div>
            )}

            {/* Mobile menu toggle button (Visible on small screens) */}
            {/* <button
              className="md:hidden text-gray-700 text-4xl flex items-center"
              onClick={toggleSidebar} // Use the new toggle function
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button> */}
          </div>
        </div>

        {/* Sidebar (Mobile) - It's correctly placed outside the main header row */}
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen} // Pass setIsOpen for closing from sidebar itself
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
        />
      </header>
    </>
  );
};

export default Header;