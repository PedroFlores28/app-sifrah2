'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaShoppingCart, FaUsers, FaWallet } from 'react-icons/fa';

const navItems = [
  { name: 'Inicio', icon: <FaHome size={20} />, href: '/dashboard' },
  { name: 'Compras', icon: <FaShoppingCart size={20} />, href: '/dashboard/compras' },
  { name: 'Red', icon: <FaUsers size={20} />, href: '/dashboard/red' },
  { name: 'Retiros', icon: <FaWallet size={20} />, href: '/dashboard/retiros' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center py-2 px-4 transition-colors ${
                isActive ? 'text-primary-purple' : 'text-gray-500'
              }`}
              style={{ color: isActive ? '#9F00AD' : '#666' }}
            >
              {item.icon}
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


