
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { USER_ROLES } from '../Constants'

const SidebarItem = ({ item, setShowRecharge, toggleSidebar = () => {}, sidebarExpanded = true, isSubItem = false }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { role } = useAuth()
    const admin = role === USER_ROLES.ADMIN;
    const [isOpen, setIsOpen] = useState(false)
    const [isCurrentMenu, setIsCurrentMenu] = useState(location.pathname === `/dashboard/${item.url}`)

    useEffect(() => {
        setIsCurrentMenu(location.pathname === `/dashboard/${item.url}`)
    }, [location.pathname, item.url])

    useEffect(() => {
        if (!sidebarExpanded && isOpen) {
            setIsOpen(false)
        }
    }, [sidebarExpanded])

    return (
        <div className="w-full">
            <div
                onClick={item.isDropdown ? () => setIsOpen(!isOpen) : (item.name === "Wallet Recharge" ? () => setShowRecharge(true) : () => { navigate(`/dashboard/${item.url}`); toggleSidebar(); })}
                className={`cursor-pointer w-full min-h-[48px] md:min-h-[56px] py-2 my-1 rounded-lg transition-all duration-300 group relative flex items-center 
                    ${isCurrentMenu 
                        ? 'bg-yellow-500/20 text-yellow-500 border-l-[4px] border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]' 
                        : 'text-white hover:bg-yellow-500/5 hover:text-yellow-500'} 
                    ${sidebarExpanded ? 'justify-start px-4' : 'justify-center px-0'}
                    ${isSubItem && sidebarExpanded ? 'pl-8' : ''}
                    active:bg-yellow-500/10 transition-colors`}
            >
                {item.icon && item.icon !== "/image/logo-nobg.png" && (
                    <item.icon className={`text-2xl flex-shrink-0 transition-all duration-200 
                        ${sidebarExpanded ? 'mr-4' : ''} 
                        ${isCurrentMenu ? 'text-yellow-500' : 'text-white group-hover:text-yellow-500'}`} 
                    />
                )}
                
                {sidebarExpanded && (
                    <p className={`text-[15px] font-bold tracking-wide transition-colors duration-200 leading-tight
                        ${isCurrentMenu ? 'text-yellow-500' : 'text-white group-hover:text-yellow-500'}`}>
                        {item.name}
                    </p>
                )}

                {sidebarExpanded && item.isDropdown && (
                    <div className={`absolute right-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                        <FaChevronDown className={`text-[12px] 
                            ${isCurrentMenu ? 'text-yellow-500' : 'text-white group-hover:text-yellow-500'}`} />
                    </div>
                )}
            </div>

            {item.isDropdown && (
                <div className={`overflow-hidden transition-all duration-300 ${isOpen && sidebarExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    {item.dropDownOptions.map((subitem, index) => {
                        if ((subitem.admin && !admin) || (subitem.merchantOnly && admin)) return null;
                        return (
                            <SidebarItem 
                                key={subitem.url || index} 
                                item={subitem} 
                                setShowRecharge={setShowRecharge} 
                                toggleSidebar={toggleSidebar} 
                                sidebarExpanded={sidebarExpanded} 
                                isSubItem={true}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SidebarItem
