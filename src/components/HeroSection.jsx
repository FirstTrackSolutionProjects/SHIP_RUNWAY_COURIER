import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import courierBg from '/courier-bg.jpg';


const HeroSection = () => {
  const navigate = useNavigate();

const {isAuthenticated} = useAuth();

  const handleLearnMoreClick = () => {
    navigate('/blog');
  };
   const handleSignInClick = () => {
    if (isAuthenticated == true){
      navigate('/dashboard')
    } 
    else {
      navigate('/sign-in')
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center text-white px-4 py-10"
      style={{ backgroundImage: `url(${courierBg})` }}
    >
      <div className="bg-black/60 rounded-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-brand-green">Ship</span>{' '}
          <span className="text-brand-orange">Runway</span> Courier
        </h1>
        <p className="text-lg md:text-xl mb-6">Your Trusted Logistics Partner</p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleLearnMoreClick}
            className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
          >
            Learn More
          </button>
          <button
            onClick={handleSignInClick}
            className="border border-white hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg text-lg"
          >
       
           { isAuthenticated == true ? "Dashboard" : "Sign In" } 

          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

