import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import BlogPage from './pages/BlogPage';
import SignIn from './pages/SignIn';
import Register from './pages/Register';

import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Pricing from './pages/Pricing';
import Tracking from './pages/Tracking';
import ContactUs from './pages/ContactUs';

import Dashboard from './pages/Dashboard';
import Verify from './pages/Verify';

import FAQs from './components/FAQs';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import { ToastContainer } from 'react-toastify';
import FloatingAssistant from './components/FloatingAssistant';

// ✅ Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard');

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const handleLogout = () => {
    localStorage.removeItem('token'); // token clear
    setIsAuthenticated(false);        // logout state
    console.log('User logged out');
  };

  const hideFooterRoutes = [
  "/sign-in",
  "/register",
  "/tracking",
  "/blog",
  "/pricing",
  ];

const shouldHideFooter =
  isDashboard || hideFooterRoutes.includes(pathname);

  return (
    <>
      <ScrollToTop />
      <Header 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
        handleLogout={handleLogout} 
      />
      <ToastContainer />

      <div className="min-h-[calc(100vh-64px)] w-full overflow-hidden bg-brand-gray pb-20 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<FAQs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />

          <Route path='/dashboard/*' element={<Dashboard/>}></Route>
          <Route path='/verify' element={<Verify/>}></Route>
        </Routes>
      	<FloatingAssistant />
        {!shouldHideFooter && <Footer />}
        <BottomNav />
      </div>
    </>
  );
};

export default App;
