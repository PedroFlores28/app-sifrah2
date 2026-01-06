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

const menuItems: MenuItem[] = [
  { name: 'INICIO', icon: <FaHome size={18} />, href: '/dashboard' },
  {
    name: 'PRODUCTOS',
    icon: <FaBox size={18} />,
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
    icon: <FaMoneyBillWave size={18} />,
    submenu: [
      { name: 'Historial', href: '/dashboard/comisiones/historial' },
      { name: 'Retiros', href: '/dashboard/comisiones/retiros' },
    ]
  },
  {
    name: 'RESUMEN',
    icon: <FaChartBar size={18} />,
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
    <aside className="hidden lg:flex lg:flex-col w-64 bg-primary-magenta min-h-screen fixed left-0 top-0">
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
          <FaSignOutAlt size={18} />
          <span>CERRAR SESIÓN</span>
        </button>
      </div>
    </aside>
  );
}


