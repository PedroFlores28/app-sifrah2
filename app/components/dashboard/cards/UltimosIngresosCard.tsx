'use client';

import React from 'react';
import { FaUser } from 'react-icons/fa';

interface Usuario {
  id: number;
  nombre: string;
  tipo: string;
}

interface UltimosIngresosCardProps {
  usuarios?: Usuario[];
}

const defaultUsuarios: Usuario[] = [
  { id: 1, nombre: 'NORMA RAMOS FERNANDEZ', tipo: 'Usuario' },
  { id: 2, nombre: 'PRUEBA 1', tipo: 'Usuario' },
  { id: 3, nombre: 'JORGE LUIS BRICEÑO OCAS', tipo: 'Usuario' },
  { id: 4, nombre: 'ALAN JOHAN VIVANCO GUTIERREZ', tipo: 'Usuario' },
];

export default function UltimosIngresosCard({
  usuarios = defaultUsuarios
}: UltimosIngresosCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Últimos Ingresos</h3>
      
      {/* Users List */}
      <div className="space-y-3">
        {usuarios.map((usuario) => (
          <div 
            key={usuario.id}
            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <FaUser className="text-green-600" size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{usuario.nombre}</p>
              <p className="text-xs text-gray-500">{usuario.tipo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


