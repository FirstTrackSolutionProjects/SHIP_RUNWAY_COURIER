import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import FontAwesome icons
import { menuItems, USER_ROLES } from '../Constants'; // Import sidebar items
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import SidebarItem from './SidebarItem.jsx';
import WalletRechargeModal from './WalletRechargeModal.jsx';
const Sidebar2 = () => {
  const {role, logout} = useAuth();
  const admin = role === USER_ROLES.ADMIN;
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showRecharge, setShowRecharge] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const closeRechargeModal = () => {
    setShowRecharge(false);
  }
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(()=>{
    if (location.pathname=="/dashboard/logout") logout()
  },[navigate])

  const sidebarItems = menuItems
  return (
    <>
    {showRecharge ? <WalletRechargeModal onClose={closeRechargeModal} /> : null}
    <div>
      {/* Menu button (Icon) - visible only below md screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-3 absolute text-green-500 z-40"
      >
        {isOpen ? <FaTimes className="h-7 w-7 text-white" /> : <FaBars className="h-7 w-7" />}
      </button>

       {/* Sidebar for md screen */}
       <div
        className={`${isSidebarHovered ? 'w-[250px] min-w-[250px]' : 'w-[72px] min-w-[72px]'} md:block hidden h-full relative bg-[#0a0a0a] overflow-y-auto overflow-x-hidden transition-all duration-[350ms] ease-in-out shadow-2xl border-r border-green-500/10`}
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
      >
      <ul className="p-3 space-y-1.5">
        {sidebarItems.map((item) => {
          if ((item.admin && !admin) || (item.merchantOnly && admin)) {
            return;
          }
          return(<SidebarItem item={item} setShowRecharge={setShowRecharge} sidebarExpanded={isSidebarHovered} />)
        })}
      </ul>
      </div>
       {/* Sidebar for beloe md screen */}
       <div
        className={`relative ${isOpen?'w-[280px]': 'w-0'} block md:hidden h-full bg-[#0a0a0a] overflow-y-auto overflow-x-hidden transition-all duration-300 border-r border-green-500/20`}
      >
        {/* Close button (Icon) */}
        <ul className="p-4 pt-14 space-y-2">
        {sidebarItems.map((item) => {
          if ((item.admin && !admin) || (item.merchantOnly && admin)) {
            return;
          }
          return(<SidebarItem item={item} setShowRecharge={setShowRecharge} toggleSidebar={toggleSidebar} />)
        })}
      </ul>
        </div>
    </div>
    </>
  );
};

export default Sidebar2;
