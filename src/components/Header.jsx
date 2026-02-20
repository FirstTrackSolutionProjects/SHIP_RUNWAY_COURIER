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
            <span className="hover:text-blue-600">Home</span>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link to="/tracking" className="relative group">
            <span className="hover:text-blue-600">Tracking</span>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link to="/pricing" className="relative group">
            <span className="hover:text-blue-600">Pricing</span>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link to="/about-us" className="relative group">
            <span className="hover:text-blue-600">About</span>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link to="/blog" className="relative group">
            <span className="hover:text-blue-600">Blog</span>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link to="/contact-us" className="relative group">
            <span className="hover:text-blue-600">Contact</span>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>

          {isAuthenticated && (
            <Link to="/dashboard" className="relative group">
            <span className="hover:text-blue-600">Dashboard</span>
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
        )}

        {!isAuthenticated && (
            <Link to="/sign-in" className="relative group">
              <span className="hover:text-blue-600">Sign In</span>
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          )}
        </nav>
        <div className='md:hidden' onClick={()=>setShowRecharge(true)}>
          {verified && location.pathname.startsWith('/dashboard')? (<>
              <div onClick={()=>setShowRecharge(true)} className={`relative bg-green-600 ${balance < 250 ? "text-red-400" : "text-white"} flex items-center font-medium rounded-tl-xl rounded-br-xl px-3 min-w-14 py-2 cursor-pointer border-l-4 border-t-4 border-green-900`}>
              {balance < 250 && <p className="absolute -mt-5 top-0 right-[2px] text-red-400 text-3xl">!</p>}
                <p>{`₹${balance}`}</p>
              </div>
              </>
          ):null}
        </div>
        {isAuthenticated?<div className='md:flex items-center space-x-4 hidden'>
          {verified && location.pathname.startsWith('/dashboard')? (<>
              <div onClick={()=>setShowRecharge(true)} className={`relative bg-green-600 ${balance < 250 ? "text-red-400" : "text-white"} flex items-center font-medium rounded-tl-xl rounded-br-xl px-3 min-w-14 py-2 cursor-pointer border-l-4 border-t-4 border-green-900`}>
              {balance < 250 && <p className="absolute -mt-5 top-0 right-[2px] text-red-400 text-3xl">!</p>}
                <p>{`₹${balance}`}</p>
              </div>
              </>
          ):null}
          <div className='flex items-center'>
            {name} <span className='bg-red-500 text-white text-xl p-3 cursor-pointer rounded-xl mx-3' onClick={logout}><FaDoorOpen /></span>
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
