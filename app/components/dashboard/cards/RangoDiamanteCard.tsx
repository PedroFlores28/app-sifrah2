'use client';

import React from 'react';
import { FaUser, FaUsers, FaStar, FaUserFriends } from 'react-icons/fa';

interface RangoDiamanteCardProps {
  porcentaje?: number;
  puntosPersonales?: number;
  directos?: number;
  rangoActual?: string;
  puntosGrupales?: number;
}

export default function RangoDiamanteCard({
  porcentaje = 75,
  puntosPersonales = 0,
  directos = 14,
  rangoActual = 'Ninguno',
  puntosGrupales = 955,
}: RangoDiamanteCardProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (porcentaje / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 min-h-[235px]">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Rango Diamante</h3>
      
      {/* Main Content - Horizontal Layout */}
      <div className="flex items-start gap-[23px]">
        {/* Progress Circle - Left Side */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
              {/* Background circle */}
              <circle
                cx="64"
                cy="64"
                r="45"
                stroke="#E5E7EB"
                strokeWidth="10"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="64"
                cy="64"
                r="45"
                stroke="#22C55E"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
              />
            </svg>
            {/* Icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                {/* Trophy/Medal Icon */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="6" stroke="#22C55E" strokeWidth="2" fill="none"/>
                  <path d="M12 14V18" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 18H15" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="8" r="3" fill="#22C55E"/>
                </svg>
              </div>
            </div>
          </div>
          <span className="text-3xl font-bold text-green-500 mt-1">{porcentaje}%</span>
          <span className="text-sm text-gray-500">Avance actual</span>
          <span className="text-xs text-gray-400 mt-0 text-center">a 32% de subir a<br/>Segundo Diamante</span>
        </div>

        {/* Stats Grid - Right Side */}
        <div className="flex-1 grid grid-cols-2 gap-3">
          {/* Puntos Personales */}
          <div className="border border-gray-200 rounded-xl p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <FaUser className="text-green-500" size={16} />
              <span className="text-xl font-bold text-green-500">{puntosPersonales}</span>
            </div>
            <span className="text-sm text-gray-500">Puntos Personales</span>
          </div>

          {/* Directos */}
          <div className="bg-green-500 text-white rounded-xl p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <FaUsers size={16} />
              <span className="text-xl font-bold">{directos}</span>
            </div>
            <span className="text-sm">Directos</span>
          </div>

          {/* Rango Actual */}
          <div className="border border-gray-200 rounded-xl p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <FaStar className="text-green-500" size={16} />
              <span className="text-lg font-bold text-gray-800">{rangoActual}</span>
            </div>
            <span className="text-sm text-gray-500">Rango Actual</span>
          </div>

          {/* Puntos Grupales */}
          <div className="bg-green-500 text-white rounded-xl p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <FaUserFriends size={16} />
              <span className="text-xl font-bold">{puntosGrupales}</span>
            </div>
            <span className="text-sm">Puntos Grupales</span>
          </div>
        </div>
      </div>
    </div>
  );
}
