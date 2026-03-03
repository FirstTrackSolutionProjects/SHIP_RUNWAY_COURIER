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
  const handleExploreClick = () => {
    navigate('/about-us');
  };

  //  const handleSignInClick = () => {
  //   if (isAuthenticated == true){
  //     navigate('/dashboard')
  //   } 
  //   else {
  //     navigate('/sign-in')
  //   }
  // };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center text-white px-4 py-10"
      style={{ backgroundImage: `url(${courierBg})` }}
    >
      <div className="bg-black/40 backdrop-blur-[2px] rounded-3xl p-8 md:p-12 max-w-3xl w-full text-center border border-white/10 shadow-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          Welcome to <span className="bg-[#E49B0F] text-brand-green px-3 py-0.5 rounded-xl shadow-sm">Ship</span>{' '}
          <span className="bg-brand-green text-brand-orange px-3 py-0.5 rounded-xl shadow-sm">Runway</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-gray-100 font-medium">Your Trusted Premium Logistics Partner</p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleLearnMoreClick}
            className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
          >
            Learn More
          </button>
          <button 
            onClick={handleExploreClick}
            className="border border-white hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
          >
            Explore 
          </button>
          {/* <button
            onClick={handleSignInClick}
            className="border border-white hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
          >
       
           { isAuthenticated == true ? "Dashboard" : "Sign In" } 

          </button> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

