'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaTimes,
  FaHome, 
  FaBox, 
  FaUsers, 
  FaMoneyBillWave, 
  FaChartBar, 
  FaTools, 
  FaUser, 
  FaSignOutAlt
} from 'react-icons/fa';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: 'INICIO', icon: <FaHome size={18} />, href: '/dashboard' },
  { name: 'PRODUCTOS', icon: <FaBox size={18} />, href: '/dashboard/productos' },
  { name: 'ORGANIZACIÓN', icon: <FaUsers size={18} />, href: '/dashboard/organizacion' },
  { name: 'COMISIONES', icon: <FaMoneyBillWave size={18} />, href: '/dashboard/comisiones' },
  { name: 'RESUMEN', icon: <FaChartBar size={18} />, href: '/dashboard/resumen' },
  { name: 'HERRAMIENTAS', icon: <FaTools size={18} />, href: '/dashboard/herramientas' },
  { name: 'PERFIL', icon: <FaUser size={18} />, href: '/dashboard/perfil' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Menu */}
      <div 
        className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl"
        style={{ animation: 'slideIn 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: '#9F00AD' }}>
          <span className="text-white font-bold text-lg">Menú</span>
          <button onClick={onClose} className="text-white">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    pathname === item.href 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span style={{ color: pathname === item.href ? '#9F00AD' : '#666' }}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
          >
            <FaSignOutAlt size={18} />
            <span>CERRAR SESIÓN</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

