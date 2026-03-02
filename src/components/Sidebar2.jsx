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
  const [isOpen, setIsOpen] = useState(false);
  const [showRecharge, setShowRecharge] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

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
          className="md:hidden p-2 sm:p-3 absolute text-yellow-500 z-40"
        >
          {isOpen ? (
            <FaTimes className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
          ) : (
            <FaBars className="h-6 w-6 sm:h-7 sm:w-7" />
          )}
        </button>

        {/* Sidebar for md screen and above (collapsed/expanded behavior) */}
        <div
          className={`${
            isSidebarHovered ? 'w-[260px] min-w-[260px]' : 'w-[72px] min-w-[72px]'
          } md:block hidden h-full relative bg-[#0a0a0a] overflow-hidden transition-all duration-[350ms] ease-in-out shadow-2xl border-r border-yellow-500/10`}
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
        >
          {/* Logo and Text Section */}
          <Link to="/" className={`flex items-center gap-2 p-4 border-b border-yellow-500/10 ${isSidebarHovered ? 'justify-start' : 'justify-center'}`}>
            <img
              src="/logo 1.png" // Assuming logo is in public folder
              alt="Logo"
              className={`h-10 w-auto object-contain transition-all duration-300 ${isSidebarHovered ? '' : 'mx-auto'}`}
            />
            {isSidebarHovered && (
              <span className="text-2xl font-extrabold tracking-tight text-white">
                <span className="text-yellow-500">Ship</span>
                <span className="text-brand-green">Runway</span>
              </span>
            )}
          </Link>

          {/* Menu Items - Scrollable container */}
          <ul className={`p-3 space-y-2 overflow-y-auto ${isSidebarHovered ? 'h-[calc(100vh-130px)]' : 'h-[calc(100vh-100px)]'}`}> {/* Adjusted height calculation */}
            {sidebarItems.map((item) => {
              if (item.admin && !admin) {
                return;
              }
              return (
                <SidebarItem
                  key={item.url || `menu-item-${item.name}`}
                  item={item}
                  setShowRecharge={setShowRecharge}
                  sidebarExpanded={isSidebarHovered}
                />
              );
            })}
          </ul>
        </div>

        {/* Sidebar for below md screen (Mobile/Tablet) - Overlay and Scrollable */}
        {/* The overlay div now has fixed positioning and covers the full screen */}
        <div
          className={`fixed inset-0 z-40 bg-black bg-opacity-70 transition-opacity duration-300 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleSidebar} // Close sidebar when clicking outside the content
        >
          {/* The actual sidebar content, sliding in */}
          <div
            className={`h-full w-[250px] bg-[#0a0a0a] shadow-2xl border-r border-yellow-500/20 flex flex-col transform transition-transform duration-300 fixed top-0 left-0 ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sidebar
          >
            {/* Logo and Text for Mobile */}
            <Link to="/" className="flex items-center gap-2 p-5 border-b border-yellow-500/10">
              <img
                src="/logo 1.png" // Assuming logo is in public folder
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-extrabold tracking-tight text-white">
                <span className="text-yellow-500">Ship</span>
                <span className="text-brand-green">Runway</span>
              </span>
            </Link>

            {/* Menu Items - Scrollable container for mobile */}
            <ul className="p-3 pt-5 space-y-2 overflow-y-auto h-[calc(100vh-120px)]"> {/* Adjusted height calculation */}
              {sidebarItems.map((item) => {
                if ((item.admin && !admin) || (item.merchantOnly && admin)) {
                  return;
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
    </>
  );
};

export default Sidebar2;
