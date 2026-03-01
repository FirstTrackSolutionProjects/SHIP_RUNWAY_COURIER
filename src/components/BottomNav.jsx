import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon as HomeOutline,
  CalculatorIcon as CalculatorOutline,
  MapPinIcon as MapOutline,
  ChatBubbleLeftEllipsisIcon as ContactOutline,
  UserIcon as UserOutline,
} from "@heroicons/react/24/outline";

import {
  HomeIcon as HomeSolid,
  CalculatorIcon as CalculatorSolid,
  MapPinIcon as MapSolid,
  ChatBubbleLeftEllipsisIcon as ContactSolid,
  UserIcon as UserSolid,
} from "@heroicons/react/24/solid";

const BottomNav = () => {
  const navItems = [
    { label: "Home", path: "/", outline: HomeOutline, solid: HomeSolid },
    { label: "Quote", path: "/pricing", outline: CalculatorOutline, solid: CalculatorSolid },
    { label: "Tracking", path: "/tracking", outline: MapOutline, solid: MapSolid },
    { label: "Contact", path: "/contact-us", outline: ContactOutline, solid: ContactSolid },
    { label: "Account", path: "/sign-in", outline: UserOutline, solid: UserSolid },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full md:hidden z-50">
      <div className="bg-[#FFF8ED] border-t border-[#f1e4d1] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] rounded-t-3xl">
        <div className="flex justify-around items-center py-3">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="relative flex flex-col items-center text-[11px] font-semibold transition-all duration-300"
            >
              {({ isActive }) => {
                const Icon = isActive ? item.solid : item.outline;

                return (
                  <>
                    {/* Active Soft Glow */}
                    {isActive && (
                      <span className="absolute -top-2 h-12 w-12 bg-brand-orange/10 rounded-full z-0"></span>
                    )}

                    <Icon
                      className={`h-6 w-6 mb-1 z-10 transition-all duration-300 ${
                        isActive
                          ? "text-brand-orange scale-110"
                          : "text-gray-500"
                      }`}
                    />

                    <span
                      className={`z-10 ${
                        isActive
                          ? "text-brand-orange"
                          : "text-gray-500"
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                );
              }}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;