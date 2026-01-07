'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  FaHome,
  FaBox,
  FaUsers,
  FaMoneyBillWave,
  FaChartBar,
  FaTools,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
  FaShoppingBag,
  FaHistory
} from 'react-icons/fa';

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  href?: string;
  submenu?: { name: string; href: string; icon?: React.ReactNode }[];
}

const CustomDashboardIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 9V3H21V9H13ZM3 13V3H11V13H3ZM13 21V11H21V21H13ZM3 21V15H11V21H3ZM5 11H9V5H5V11ZM15 19H19V13H15V19ZM15 7H19V5H15V7ZM5 19H9V17H5V19Z" fill="currentColor" />
  </svg>
);

const CustomProductsIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 22C6.45 22 5.97933 21.8043 5.588 21.413C5.19667 21.0217 5.00067 20.5507 5 20C4.99933 19.4493 5.19533 18.9787 5.588 18.588C5.98067 18.1973 6.45133 18.0013 7 18C7.54867 17.9987 8.01967 18.1947 8.413 18.588C8.80633 18.9813 9.002 19.452 9 20C8.998 20.548 8.80233 21.019 8.413 21.413C8.02367 21.807 7.55267 22.0027 7 22ZM17 22C16.45 22 15.9793 21.8043 15.588 21.413C15.1967 21.0217 15.0007 20.5507 15 20C14.9993 19.4493 15.1953 18.9787 15.588 18.588C15.9807 18.1973 16.4513 18.0013 17 18C17.5487 17.9987 18.0197 18.1947 18.413 18.588C18.8063 18.9813 19.002 19.452 19 20C18.998 20.548 18.8023 21.019 18.413 21.413C18.0237 21.807 17.5527 22.0027 17 22ZM5.2 4H19.95C20.3333 4 20.625 4.171 20.825 4.513C21.025 4.855 21.0333 5.20067 20.85 5.55L17.3 11.95C17.1167 12.2833 16.871 12.5417 16.563 12.725C16.255 12.9083 15.9173 13 15.55 13H8.1L7 15H19V17H7C6.25 17 5.68333 16.671 5.3 16.013C4.91667 15.355 4.9 14.7007 5.25 14.05L6.6 11.6L3 4H1V2H4.25L5.2 4Z" fill="currentColor" />
  </svg>
);

const CustomCommissionsIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12.5C11.0717 12.5 10.1815 12.8687 9.52513 13.5251C8.86875 14.1815 8.5 15.0717 8.5 16C8.5 16.9283 8.86875 17.8185 9.52513 18.4749C10.1815 19.1313 11.0717 19.5 12 19.5C12.9283 19.5 13.8185 19.1313 14.4749 18.4749C15.1313 17.8185 15.5 16.9283 15.5 16C15.5 15.0717 15.1313 14.1815 14.4749 13.5251C13.8185 12.8687 12.9283 12.5 12 12.5ZM10.5 16C10.5 15.6022 10.658 15.2206 10.9393 14.9393C11.2206 14.658 11.6022 14.5 12 14.5C12.3978 14.5 12.7794 14.658 13.0607 14.9393C13.342 15.2206 13.5 15.6022 13.5 16C13.5 16.3978 13.342 16.7794 13.0607 17.0607C12.7794 17.342 12.3978 17.5 12 17.5C11.6022 17.5 11.2206 17.342 10.9393 17.0607C10.658 16.7794 10.5 16.3978 10.5 16Z" fill="currentColor" />
    <path d="M17.526 5.11618L14.347 0.65918L2.658 9.99718L2.01 9.99018V10.0002H1.5V22.0002H22.5V10.0002H21.538L19.624 4.40118L17.526 5.11618ZM19.425 10.0002H9.397L16.866 7.45418L18.388 6.96718L19.425 10.0002ZM15.55 5.79018L7.84 8.41818L13.946 3.54018L15.55 5.79018ZM3.5 18.1692V13.8292C3.92218 13.6802 4.30565 13.4386 4.62231 13.1221C4.93896 12.8056 5.18077 12.4223 5.33 12.0002H18.67C18.8191 12.4225 19.0609 12.806 19.3775 13.1227C19.6942 13.4393 20.0777 13.6811 20.5 13.8302V18.1702C20.0777 18.3193 19.6942 18.561 19.3775 18.8777C19.0609 19.1944 18.8191 19.5779 18.67 20.0002H5.332C5.18218 19.5779 4.93996 19.1943 4.62302 18.8775C4.30607 18.5608 3.9224 18.3188 3.5 18.1692Z" fill="currentColor" />
  </svg>
);

const CustomSummaryIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3945_8549)">
      <path d="M20 12C20 12.5523 20.4477 13 21 13C21.5523 13 22 12.5523 22 12H21H20ZM12 22C12.5523 22 13 21.5523 13 21C13 20.4477 12.5523 20 12 20V21V22ZM19.1247 17.2191C18.6934 16.8741 18.0641 16.944 17.7191 17.3753C17.3741 17.8066 17.444 18.4359 17.8753 18.7809L18.5 18L19.1247 17.2191ZM20.3753 20.7809C20.8066 21.1259 21.4359 21.056 21.7809 20.6247C22.1259 20.1934 22.056 19.5641 21.6247 19.2191L21 20L20.3753 20.7809ZM7 7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9V8V7ZM17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V8V9ZM7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13V12V11ZM11 13C11.5523 13 12 12.5523 12 12C12 11.4477 11.5523 11 11 11V12V13ZM21 12H22V4.5H21H20V12H21ZM21 4.5H22C22 3.83696 21.7366 3.20107 21.2678 2.73223L20.5607 3.43934L19.8536 4.14645C19.9473 4.24022 20 4.36739 20 4.5H21ZM20.5607 3.43934L21.2678 2.73223C20.7989 2.26339 20.163 2 19.5 2V3V4C19.6326 4 19.7598 4.05268 19.8536 4.14645L20.5607 3.43934ZM19.5 3V2H4.5V3V4H19.5V3ZM4.5 3V2C3.83696 2 3.20107 2.26339 2.73223 2.73223L3.43934 3.43934L4.14645 4.14645C4.24021 4.05268 4.36739 4 4.5 4V3ZM3.43934 3.43934L2.73223 2.73223C2.26339 3.20107 2 3.83696 2 4.5H3H4C4 4.36739 4.05268 4.24021 4.14645 4.14645L3.43934 3.43934ZM3 4.5H2V19.5H3H4V4.5H3ZM3 19.5H2C2 20.163 2.26339 20.7989 2.73223 21.2678L3.43934 20.5607L4.14645 19.8536C4.05268 19.7598 4 19.6326 4 19.5H3ZM3.43934 20.5607L2.73223 21.2678C3.20107 21.7366 3.83696 22 4.5 22V21V20C4.36739 20 4.24022 19.9473 4.14645 19.8536L3.43934 20.5607ZM4.5 21V22H12V21V20H4.5V21ZM19 16H18C18 17.1046 17.1046 18 16 18V19V20C18.2091 20 20 18.2091 20 16H19ZM16 19V18C14.8954 18 14 17.1046 14 16H13H12C12 18.2091 13.7909 20 16 20V19ZM13 16H14C14 14.8954 14.8954 14 16 14V13V12C13.7909 12 12 13.7909 12 16H13ZM16 13V14C17.1046 14 18 14.8954 18 16H19H20C20 13.7909 18.2091 12 16 12V13ZM18.5 18L17.8753 18.7809L20.3753 20.7809L21 20L21.6247 19.2191L19.1247 17.2191L18.5 18ZM7 8V9H17V8V7H7V8ZM7 12V13H11V12V11H7V12Z" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="clip0_3945_8549">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const menuItems: MenuItem[] = [
  { name: 'INICIO', icon: <CustomDashboardIcon size={18} />, href: '/dashboard' },
  {
    name: 'PRODUCTOS',
    icon: <CustomProductsIcon size={18} />,
    submenu: [
      { name: 'Compras', href: '/dashboard/productos/compras', icon: <FaShoppingBag size={14} /> },
      { name: 'Afiliación', href: '/dashboard/productos/afiliacion', icon: <FaUsers size={14} /> },
      { name: 'Historial', href: '/dashboard/productos/historial', icon: <FaHistory size={14} /> },
    ]
  },
  {
    name: 'ORGANIZACIÓN',
    icon: <FaUsers size={18} />,
    submenu: [
      { name: 'Mi Red', href: '/dashboard/organizacion/red' },
      { name: 'Árbol', href: '/dashboard/organizacion/arbol' },
    ]
  },
  {
    name: 'COMISIONES',
    icon: <CustomCommissionsIcon size={18} />,
    submenu: [
      { name: 'Historial', href: '/dashboard/comisiones/historial' },
      { name: 'Retiros', href: '/dashboard/comisiones/retiros' },
    ]
  },
  {
    name: 'RESUMEN',
    icon: <CustomSummaryIcon size={18} />,
    submenu: [
      { name: 'Estadísticas', href: '/dashboard/resumen/estadisticas' },
      { name: 'Reportes', href: '/dashboard/resumen/reportes' },
    ]
  },
  {
    name: 'HERRAMIENTAS',
    icon: <FaTools size={18} />,
    submenu: [
      { name: 'Material', href: '/dashboard/herramientas/material' },
      { name: 'Capacitación', href: '/dashboard/herramientas/capacitacion' },
    ]
  },
  { name: 'PERFIL', icon: <FaUser size={18} />, href: '/dashboard/perfil' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev =>
      prev.includes(menuName)
        ? prev.filter(m => m !== menuName)
        : [...prev, menuName]
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    // INICIO (Root dashboard) should only be active on exact match
    if (href === '/dashboard' && pathname !== '/dashboard') return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Auto-expand menu if a submenu item is active
  useEffect(() => {
    const activeMenu = menuItems.find(item =>
      item.submenu?.some(subItem => pathname === subItem.href || pathname.startsWith(subItem.href + '/'))
    );
    if (activeMenu) {
      setOpenMenus(prev => prev.includes(activeMenu.name) ? prev : [...prev, activeMenu.name]);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-[#D209B6] min-h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="flex items-center justify-center py-6 mt-10">
        <Image
          src="/logo-sifrah.svg"
          alt="SIFRAH"
          width={200}
          height={95}
          className="w-48 h-auto"
          priority
        />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 mt-8">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-white transition-colors ${openMenus.includes(item.name) ? 'bg-primary-purple' : 'hover:bg-white/10'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    {openMenus.includes(item.name) ? (
                      <FaChevronDown size={12} />
                    ) : (
                      <FaChevronRight size={12} />
                    )}
                  </button>
                  {openMenus.includes(item.name) && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.href}
                            className={`flex items-center gap-3 px-4 py-2 text-sm text-white/80 hover:text-white rounded-lg transition-colors ${pathname === subItem.href ? 'bg-primary-purple text-white' : 'hover:bg-white/5'
                              }`}
                          >
                            {subItem.icon && <span>{subItem.icon}</span>}
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href || '#'}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-white transition-colors ${isActive(item.href) ? 'bg-primary-purple' : 'hover:bg-white/10'
                    }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-purple hover:bg-purple-800 text-white rounded-lg font-semibold transition-colors"
        >
          {/* <FaSignOutAlt size={18} /> */}
          <span>CERRAR SESIÓN</span>
        </button>
      </div>
    </aside>
  );
}


