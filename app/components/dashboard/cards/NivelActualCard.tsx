'use client';

import React from 'react';
import { FaUser, FaUsers, FaStar, FaUserFriends } from 'react-icons/fa';

interface NivelActualCardProps {
  nivel?: string;
  puntosPersonales?: number;
  directos?: number;
  rangoActual?: string;
  puntosGrupales?: number;
}

export default function NivelActualCard({
  nivel = 'Ninguno',
  puntosPersonales = 0,
  directos = 14,
  rangoActual = 'Ninguno',
  puntosGrupales = 955,
}: NivelActualCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Nivel Actual</h3>
      
      {/* Nivel Badge */}
      <div 
        className="rounded-xl p-4 mb-3 flex items-center gap-3"
        style={{ 
          background: 'linear-gradient(135deg, #F8BBD9 0%, #E91E63 50%, #9C27B0 100%)'
        }}
      >
        <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" fill="white"/>
          </svg>
        </div>
        <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
          {nivel}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
        {/* Puntos Personales */}
        <div className="border border-gray-200 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <FaUser className="text-green-600" size={14} />
            <span className="text-lg font-bold text-gray-800">{puntosPersonales}</span>
          </div>
          <p className="text-xs text-gray-500">Puntos Personales</p>
        </div>

        {/* Directos */}
        <div className="border border-gray-200 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <FaUsers className="text-green-600" size={14} />
            <span className="text-lg font-bold text-gray-800">{directos}</span>
          </div>
          <p className="text-xs text-gray-500">Directos</p>
        </div>

        {/* Rango Actual */}
        <div className="border border-gray-200 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <FaStar className="text-green-600" size={14} />
            <span className="text-sm font-bold text-gray-800">{rangoActual}</span>
          </div>
          <p className="text-xs text-gray-500">Rango Actual</p>
        </div>

        {/* Puntos Grupales */}
        <div className="border border-gray-200 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <FaUserFriends className="text-green-600" size={14} />
            <span className="text-lg font-bold text-gray-800">{puntosGrupales}</span>
          </div>
          <p className="text-xs text-gray-500">Puntos Grupales</p>
        </div>
      </div>
    </div>
  );
}
