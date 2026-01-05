import React from 'react';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { FaYoutube, FaTiktok } from 'react-icons/fa6';

export default function SocialIcons() {
  return (
    <div className="flex gap-4 justify-center">
      <a
        href="#"
        className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-colors"
        style={{ backgroundColor: '#9F00AD80' }}
        aria-label="Facebook"
      >
        <FaFacebook size={20} />
      </a>
      <a
        href="#"
        className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-colors"
        style={{ backgroundColor: '#9F00AD80' }}
        aria-label="YouTube"
      >
        <FaYoutube size={20} />
      </a>
      <a
        href="#"
        className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-colors"
        style={{ backgroundColor: '#9F00AD80' }}
        aria-label="TikTok"
      >
        <FaTiktok size={20} />
      </a>
      <a
        href="#"
        className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-colors"
        style={{ backgroundColor: '#9F00AD80' }}
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={20} />
      </a>
    </div>
  );
}


