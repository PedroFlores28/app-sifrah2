'use client';

import React from 'react';

export default function PackAfiliacionCard() {
  return (
    <div 
      className="rounded-2xl p-6 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity"
      style={{ 
        background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
        border: '3px solid #22C55E'
      }}
    >
      <h3 className="text-xl font-bold text-white">Pack de Afiliación</h3>
      <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" fill="#F59E0B"/>
        </svg>
      </div>
    </div>
  );
}

