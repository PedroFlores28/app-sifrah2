'use client';

import React from 'react';

interface ComisionesCardProps {
  saldoDisponible?: number;
  saldoNoDisponible?: number;
  totalGanado?: number;
}

export default function ComisionesCard({
  saldoDisponible = 1141.59,
  saldoNoDisponible = 6.00,
  totalGanado = 5290.09,
}: ComisionesCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Comisiones</h3>
        <p className="text-sm text-gray-500">Completa los porcentajes y<br />¡disfruta el viaje!</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Saldo Disponible */}
        <div className="border border-gray-200 rounded-xl p-4 text-center">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" fill="#F97316"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-800">{saldoDisponible.toFixed(2)}</span>
          <p className="text-xs text-gray-500 mt-1">Saldo Disponible</p>
        </div>

        {/* Saldo No Disponible */}
        <div className="border border-gray-200 rounded-xl p-4 text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" fill="#3B82F6"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-800">{saldoNoDisponible.toFixed(2)}</span>
          <p className="text-xs text-gray-500 mt-1">Saldo No Disponible</p>
        </div>

        {/* Total Ganado */}
        <div className="border border-gray-200 rounded-xl p-4 text-center col-span-2 lg:col-span-1">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" fill="#9F00AD"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-800">{totalGanado.toFixed(2)}</span>
          <p className="text-xs text-gray-500 mt-1">Total Ganado</p>
        </div>
      </div>
    </div>
  );
}


