import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import WalletRechargeModal from './WalletRechargeModal';
import { FaDoorOpen } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_APP_API_URL

const Header = () => {
const [isOpen, setIsOpen] = useState(false);
const {isAuthenticated, name, logout, verified} = useAuth()
const [showRecharge, setShowRecharge] = useState(false);
const closeRechargeModal = () => {
  setShowRecharge(false)
}
const [balance, setBalance] = useState(0.00);
  useEffect(() => {
    const fetchBalance = async () => {
      console.log("Fetching balance")
      const balance = await fetch(
        `${API_URL}/wallet/balance`,{
          method : 'POST',
          headers:{
            "Authorization":localStorage.getItem("token"),
          }
        }
      )
        .then((response) => response.json())
        .then((result) => {console.log(result); return result.balance});
      if (balance) {
        setBalance(balance);
      }
    };
    if (isAuthenticated && verified){
        fetchBalance();
    }
  }, [isAuthenticated]);
  
  const handleLogout = () => {
  localStorage.removeItem('token'); 
  logout(); // from useAuth context
  console.log("User logged out");
};
return (
    <>
    {showRecharge ? <WalletRechargeModal onClose={closeRechargeModal} /> : null}
    <header className="w-full bg-gray-100 sticky top-0 z-50 h-16 flex items-center px-4 shadow">
    <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="h-24 flex items-center ">
          <img 
            src="/logo 1.png" 
            alt="Logo" 
            className="h-20 w-auto sm:h-24 object-contain" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-semibold text-gray-700">
        <Link
            to="/"
            className="relative group"
        >
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
        <div className='md:hidden' onClick={()=>setShowRecharge(true)}>
          {verified && location.pathname.startsWith('/dashboard')? (<>
              <div onClick={()=>setShowRecharge(true)} className={`relative bg-brand-green ${balance < 250 ? "text-brand-orange" : "text-white"} flex items-center font-bold rounded-xl px-4 py-2 cursor-pointer border border-brand-green-light shadow-sm`}>
              {balance < 250 && <span className="mr-1 text-brand-orange animate-pulse">⚠️</span>}
                <p>{`₹${balance}`}</p>
              </div>
              </>
          ):null}
        </div>
        {isAuthenticated?<div className='md:flex items-center space-x-4 hidden'>
          {verified && location.pathname.startsWith('/dashboard')? (<>
              <div onClick={()=>setShowRecharge(true)} className={`relative bg-brand-green ${balance < 250 ? "text-brand-orange" : "text-white"} flex items-center font-bold rounded-xl px-4 py-2 cursor-pointer border border-brand-green-light shadow-sm transition-all duration-300`}>
              {balance < 250 && <span className="mr-1 text-brand-orange animate-pulse">⚠️</span>}
                <p>{`₹${balance}`}</p>
              </div>
              </>
          ):null}
          <div className='flex items-center'>
            <span className="text-brand-accent font-semibold">{name}</span> 
            <span className='bg-brand-green hover:bg-brand-green-dark text-white text-lg p-2.5 cursor-pointer rounded-xl mx-3 transition-all duration-300 shadow-sm' onClick={logout}>
              <FaDoorOpen />
            </span>
          </div>
          </div>:null}



        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-700 text-4xl"
          onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <FiX /> : <FiMenu />}
      
        </button>
      </div>

      {/* Sidebar (Mobile) */}
     <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout} // yeh line important hai
        />

    </header>
    </>
  );
};

export default Header;
