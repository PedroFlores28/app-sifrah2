'use client';

import React from 'react';

interface TotalGanadoCardProps {
  total?: number;
}

export default function TotalGanadoCard({
  total = 5290.09
}: TotalGanadoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#22C55E" strokeWidth="2" fill="none"/>
            <path d="M12 6V18M8 10H16M8 14H16" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <span className="text-3xl font-bold text-gray-800">{total.toFixed(2)}</span>
          <p className="text-sm text-gray-500">Total Ganado</p>
        </div>
      </div>
    </div>
  );
}

