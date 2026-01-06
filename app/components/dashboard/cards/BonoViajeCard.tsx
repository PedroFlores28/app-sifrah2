'use client';

import React from 'react';

interface BonoViajeCardProps {
  mensaje?: string;
}

export default function BonoViajeCard({
  mensaje = 'Tu progreso hacia el Bono Viaje se actualizará próximamente. ¡Sigue trabajando para alcanzar tus objetivos!'
}: BonoViajeCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-xl font-bold text-gray-800">Bono Viaje</h3>
        <span className="text-sm text-gray-500">Estado y progreso del socio</span>
      </div>
      
      {/* Message Box */}
      <div 
        className="rounded-xl p-4 text-white text-center"
        style={{ backgroundColor: '#22C55E' }}
      >
        <p className="text-sm leading-relaxed">{mensaje}</p>
      </div>
    </div>
  );
}


