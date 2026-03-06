import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import FontAwesome icons
import { menuItems, USER_ROLES } from '../Constants'; // Import sidebar items
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import SidebarItem from './SidebarItem.jsx';
import WalletRechargeModal from './WalletRechargeModal.jsx';
import { Link } from 'react-router-dom'; // Import Link

const Sidebar2 = () => {
  const { role, logout } = useAuth();
  const admin = role === USER_ROLES.ADMIN;
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Controls mobile overlay
  const [showRecharge, setShowRecharge] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true); // Controls desktop sidebar
  
  const closeRechargeModal = () => {
    setShowRecharge(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (location.pathname === "/dashboard/logout") logout();
  }, [navigate]);

  const sidebarItems = menuItems;

  return (
    <>
      {showRecharge ? <WalletRechargeModal onClose={closeRechargeModal} /> : null}
      <div>
        {/* Menu button (Icon) - visible only below md screens */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-3 absolute top-2 left-2 text-yellow-500 z-40 bg-[#0a0a0a]/50 backdrop-blur-sm rounded-lg border border-yellow-500/10 active:scale-95 transition-all"
        >
          {isOpen ? (
            <FaTimes className="h-6 w-6 text-white" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>

        {/* Sidebar for md screen and above (collapsed/expanded behavior) */}
        <div
          className={`${
            isDesktopSidebarOpen ? 'w-[260px] min-w-[260px]' : 'w-[72px] min-w-[72px]'
          } md:block hidden h-full relative bg-[#0a0a0a] overflow-hidden transition-all duration-[350ms] ease-in-out shadow-2xl border-r border-yellow-500/10`}
          onMouseEnter={() => setIsDesktopSidebarOpen(true)}
          onMouseLeave={() => setIsDesktopSidebarOpen(false)}
        >
          {/* Logo and Text Section */}
          <div className={`flex items-center gap-2 p-4 border-b border-yellow-500/10 ${isDesktopSidebarOpen ? 'justify-start' : 'justify-center'} relative`}>
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo 1.png" // Assuming logo is in public folder
                alt="Logo"
                className={`h-10 w-auto object-contain transition-all duration-300 ${isDesktopSidebarOpen ? '' : 'mx-auto'}`}
              />
              {isDesktopSidebarOpen && (
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  <span className="text-yellow-500">Ship</span>
                  <span className="text-brand-green">Runway</span>
                </span>
              )}
            </Link>
          </div>

          {/* Menu Items - Scrollable container */}
          <ul className={`p-3 space-y-2 overflow-y-auto ${isDesktopSidebarOpen ? 'h-[calc(100vh-130px)]' : 'h-[calc(100vh-100px)]'}`}
              style={{
                WebkitOverflowScrolling: 'touch', // For smooth scrolling on iOS
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none',  /* IE and Edge */
              }}
          > {/* Adjusted height calculation */}
            {sidebarItems.map((item) => {
              if ((item.admin && !admin) || (item.merchantOnly && admin)) {
                return null;
              }
              return (
                <SidebarItem
                  key={item.url || `menu-item-${item.name}`}
                  item={item}
                  setShowRecharge={setShowRecharge}
                  sidebarExpanded={isDesktopSidebarOpen}
                />
              );
            })}
          </ul>
        </div>

        {/* Sidebar for below md screen (Mobile/Tablet) - Overlay and Scrollable */}
        <div
          className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleSidebar}
        >
          {/* The actual sidebar content, sliding in */}
          <div
            className={`h-full w-[280px] bg-[#0a0a0a] shadow-[15px_0_30px_rgba(0,0,0,0.6)] border-r border-yellow-500/20 flex flex-col transform transition-transform duration-300 ease-out fixed top-0 left-0 ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo and Header for Mobile Drawer */}
            <div className="flex items-center justify-between p-5 border-b border-yellow-500/10">
              <Link to="/" className="flex items-center gap-2" onClick={toggleSidebar}>
                <img
                  src="/logo 1.png"
                  alt="Logo"
                  className="h-9 w-auto object-contain"
                />
                <span className="text-lg font-extrabold tracking-tight text-white">
                  <span className="text-yellow-500">Ship</span>
                  <span className="text-brand-green">Runway</span>
                </span>
              </Link>
              <button onClick={toggleSidebar} className="text-white/70 hover:text-white">
                <FaTimes size={18} />
              </button>
            </div>

            {/* Menu Items - Scrollable container for mobile */}
            <div 
              className="flex-grow overflow-y-auto overscroll-contain pb-24 px-3"
              style={{ 
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <ul className="pt-4 space-y-1.5">
                {sidebarItems.map((item) => {
                  if ((item.admin && !admin) || (item.merchantOnly && admin)) {
                    return null;
                  }
                  return (
                    <SidebarItem
                      key={item.url || `menu-item-${item.name}`}
                      item={item}
                      setShowRecharge={setShowRecharge}
                      toggleSidebar={toggleSidebar}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar2;
