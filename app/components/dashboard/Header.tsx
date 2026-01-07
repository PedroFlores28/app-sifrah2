'use client';

import React, { useState } from 'react';
import { FaShareAlt, FaCog, FaBars, FaTimes } from 'react-icons/fa';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  title?: string;
  userCode?: string;
  userName?: string;
  userEmail?: string;
}

export default function Header({
  title = 'Dashboard',
  userCode = 'D44F71',
  userName = 'Sifrah',
  userEmail = '@gmail.com'
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold" style={{ color: '#9F00AD' }}>{title}</h1>

        <div className="flex items-center gap-4">
          {/* Share Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors"
            style={{ backgroundColor: '#D209B6' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#9F00AD'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#D209B6'}
          >
            <FaShareAlt size={16} />
            <span className="font-medium">Compartir Afiliación</span>
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#9F00AD" />
              </svg>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-800">{userName}</p>
              <p className="text-sm text-gray-500">{userEmail}</p>
            </div>
          </div>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
            <FaCog size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-50" style={{ backgroundColor: '#D209B6' }}>
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="24" height="32" viewBox="0 0 110 229" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M78.7502 1.2382C77.3754 8.06954 76.0435 10.9911 73.5945 12.5808C72.8641 13.0534 70.8877 13.8268 69.2551 14.2134C63.5838 15.6742 62.6386 15.932 62.6386 16.2328C62.6386 16.6194 64.4861 17.3069 68.4388 18.381C74.6256 20.0136 76.1294 21.5603 77.8909 28.4776C78.965 32.5163 79.5236 33.8052 80.0392 33.3326C80.168 33.2037 80.8125 30.9695 81.457 28.3487C83.2615 21.2166 84.5074 19.9277 90.9951 18.2951C95.2915 17.2639 96.5804 16.7483 96.5804 16.2328C96.5804 15.8031 93.2292 14.686 90.7802 14.2994C86.269 13.6549 83.2615 11.12 82.1874 7.21025C80.3399 0.250023 79.3088 -1.51152 78.7502 1.2382Z" fill="white" />
            <path d="M100.877 43.9878C100.877 44.4174 101.049 45.9212 101.264 47.339C102.552 55.76 103.197 68.0908 102.853 78.9178C102.724 83.9876 102.51 88.7137 102.424 89.444C102.338 90.1315 102.123 92.0649 101.994 93.7405C100.189 113.289 95.1197 135.201 88.7609 151.098C76.602 181.302 58.6429 203.171 33.5517 218.337C30.1575 220.399 27.4078 222.247 27.4078 222.505C27.4078 222.805 27.9664 222.848 28.9116 222.719C30.759 222.419 39.4378 218.595 39.4378 218.079C39.4378 217.864 39.5667 217.736 39.7816 217.779C39.9534 217.822 40.5549 217.607 41.1564 217.263C42.7461 216.361 45.1091 215.029 47.3433 213.869C48.4174 213.267 49.3196 212.666 49.3196 212.451C49.3196 212.279 49.5345 212.107 49.8352 212.107C50.2219 212.107 54.3035 209.572 56.8384 207.725C60.2326 205.233 68.7395 198.187 71.2315 195.738C90.0069 177.349 102.123 153.332 106.849 125.061C109.556 108.95 110.071 91.5923 108.353 75.1799C107.708 68.7352 105.173 53.6547 104.099 49.702C102.853 45.2767 100.877 41.7106 100.877 43.9878Z" fill="white" />
            <path d="M81.1133 49.0575C80.8125 49.4012 80.6836 50.1316 80.8125 50.6472C81.2422 52.2369 80.2969 64.4388 79.3517 69.3367C75.3131 90.8618 63.1971 106.415 45.5388 112.86C41.0705 114.492 37.9341 115.18 30.3724 116.297C22.9395 117.371 20.2328 118.015 15.9793 119.777C9.31983 122.57 4.67968 126.651 2.27367 131.893C0.469171 135.846 -0.261223 139.412 0.0824916 142.634C1.11364 152.602 10.0073 156.769 21.6506 152.731C24.787 151.656 27.5797 149.723 29.642 147.145C33.0791 142.935 31.7043 142.118 26.5056 145.298C22.8966 147.489 18.6431 148.735 16.2801 148.305C11.2532 147.36 9.06204 143.021 11.6399 139.111C14.0029 135.588 18.9868 133.311 26.1619 132.494C32.9073 131.721 39.4378 133.397 44.3787 137.134C50.4797 141.775 55.0769 150.196 55.6354 157.8C56.108 164.202 54.2605 170.99 49.3196 180.958C41.9298 195.953 31.2316 208.756 14.6044 222.419C10.7806 225.598 7.81608 228.348 7.98793 228.52C8.46054 228.992 12.7999 228.047 12.7999 227.488C12.7999 227.231 12.9288 227.145 13.1007 227.274C13.2296 227.446 14.0029 227.145 14.8193 226.672C15.5926 226.2 16.2371 225.899 16.2371 226.071C16.2371 226.2 17.3971 225.727 18.815 224.954C20.2328 224.223 21.3928 223.407 21.3928 223.192C21.3928 222.977 21.5647 222.891 21.7795 223.02C21.9943 223.149 22.381 222.977 22.6817 222.634C22.9825 222.29 23.3692 222.118 23.584 222.247C23.7988 222.376 23.9707 222.247 23.9707 222.032C23.9707 221.774 24.2285 221.559 24.5292 221.559C24.787 221.559 26.5056 220.614 28.3101 219.497C30.0716 218.38 32.4776 216.876 33.6376 216.189C34.7977 215.458 36.0437 214.599 36.3874 214.255C36.7741 213.912 37.6333 213.353 38.2348 213.01C38.8793 212.666 39.9534 211.892 40.5979 211.291C41.2423 210.646 42.5742 209.615 43.5195 208.928C46.1403 207.037 47.3433 205.92 53.1864 200.077C72.3056 180.915 84.2926 155.394 88.1594 125.706C91.124 103.193 89.7921 78.1014 84.4645 55.0725C82.9607 48.499 82.4022 47.5108 81.1133 49.0575Z" fill="white" />
            <path d="M40.6838 71.7427C37.5904 73.0317 35.9577 74.2347 34.2821 76.2969C30.2864 81.4097 29.7709 88.4129 33.0362 94.256C34.5829 96.9628 36.7311 98.8962 39.8675 100.357C41.9298 101.302 42.7891 101.474 46.527 101.474C50.2649 101.474 51.1242 101.302 53.1864 100.357C56.1939 98.9392 58.8577 96.1894 60.5763 92.7093C61.7793 90.3463 61.9512 89.5729 61.9512 86.4795C61.9512 83.9016 61.6934 82.3549 60.963 80.5504C59.76 77.457 56.5806 73.9339 53.5302 72.2583C51.5538 71.1842 50.7375 70.9694 47.1714 70.8834C43.6484 70.7545 42.7461 70.8834 40.6838 71.7427Z" fill="white" />
          </svg>
        </div>

        {/* Code */}
        <span className="text-white font-semibold">Cód: {userCode}</span>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center overflow-hidden">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#9F00AD" />
            </svg>
          </div>

          {/* Share */}
          <button className="text-white">
            <FaShareAlt size={18} />
          </button>

          {/* Settings */}
          <button className="text-white">
            <FaCog size={18} />
          </button>

          {/* Menu */}
          <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <FaBars size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}


