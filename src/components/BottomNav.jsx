import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon as HomeOutline,
  CalculatorIcon as CalculatorOutline,
  MapPinIcon as MapOutline,
  LifebuoyIcon as SupportOutline,
  UserIcon as UserOutline,
} from "@heroicons/react/24/outline";

import {
  HomeIcon as HomeSolid,
  CalculatorIcon as CalculatorSolid,
  MapPinIcon as MapSolid,
  LifebuoyIcon as SupportSolid,
  UserIcon as UserSolid,
} from "@heroicons/react/24/solid";

const BottomNav = () => {
  const navItems = [
    { label: "Home", path: "/", outline: HomeOutline, solid: HomeSolid },
    { label: "Quote", path: "/pricing", outline: CalculatorOutline, solid: CalculatorSolid },
    { label: "Tracking", path: "/tracking", outline: MapOutline, solid: MapSolid },
    { label: "Support", path: "/support", outline: SupportOutline, solid: SupportSolid },
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
              className="relative flex flex-col items-center text-[11px] font-medium transition-all duration-300"
            >
              {({ isActive }) => {
                const Icon = isActive ? item.solid : item.outline;

                return (
                  <>
                    {/* Active Soft Glow */}
                    {isActive && (
                      <span className="absolute -top-2 h-11 w-11 bg-[#F3E5D3] rounded-full z-0"></span>
                    )}

                    <Icon
                      className={`h-6 w-6 mb-1 z-10 transition-all duration-300 ${
                        isActive
                          ? "text-[#E67E22] scale-110"
                          : "text-[#7A9E7E]"
                      }`}
                    />

                    <span
                      className={`z-10 ${
                        isActive
                          ? "text-[#E67E22] font-semibold"
                          : "text-[#7A9E7E]"
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