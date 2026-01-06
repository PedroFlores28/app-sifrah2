'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BrandingPanel from '../components/BrandingPanel';
import SocialIcons from '../components/SocialIcons';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    usuario: '',
    contraseña: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Credenciales ficticias
    const validUser = 'demo';
    const validPassword = 'demo123';

    if (formData.usuario === validUser && formData.contraseña === validPassword) {
      // Guardar en localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({
        name: 'Sifrah',
        email: '@gmail.com',
        code: 'D44F71'
      }));
      
      // Redirigir al dashboard
      router.push('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos. Usa: demo / demo123');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <BrandingPanel isMobile={true} activeTab="inicio" />
      </div>

      {/* Mobile Form Container */}
      <div className="lg:hidden bg-white rounded-t-3xl -mt-6 relative z-10 flex-1 px-6 py-8">
        {/* Mobile Tabs */}
        <div className="flex mb-6">
          <div className="flex-1 flex flex-col items-center">
            <Link
              href="/login"
              className="w-full text-center py-3 font-semibold"
              style={{ color: '#9F00AD' }}
            >
              Inicio
            </Link>
            <div className="w-full h-1" style={{ backgroundColor: '#FFD900' }}></div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <Link
              href="/registro"
              className="w-full text-center py-3 font-semibold"
              style={{ color: '#666C68' }}
            >
              Registro
            </Link>
            <div className="w-full h-1" style={{ backgroundColor: '#666C68' }}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Usuario Input */}
          <div>
            <label htmlFor="usuario-mobile" className="block text-gray-700 font-medium mb-2">
              Usuario:
            </label>
            <div className="relative">
              <input
                type="text"
                id="usuario-mobile"
                name="usuario"
                placeholder="Usuario"
                value={formData.usuario}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
                style={{ borderColor: '#9F00AD' }}
                onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                required
              />
              <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#9F00AD80' }} />
            </div>
          </div>

          {/* Contraseña Input */}
          <div>
            <label htmlFor="contraseña-mobile" className="block text-gray-700 font-medium mb-2">
              Contraseña:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="contraseña-mobile"
                name="contraseña"
                placeholder="Contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
                style={{ borderColor: '#9F00AD' }}
                onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors"
                style={{ color: '#9F00AD80' }}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary-purple text-white py-3 font-semibold text-lg hover:bg-primary-magenta transition-colors"
            style={{ borderRadius: '30px' }}
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center text-sm" style={{ color: '#89888D' }}>
          <span style={{ userSelect: 'none' }}>¿Olvidaste tu contraseña? </span>
          <a
            href="#"
            className="hover:underline transition-colors"
            style={{ color: '#9F00AD' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#D209B6'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#9F00AD'}
          >
            Haz clic aquí
          </a>
        </div>

        {/* Social Icons */}
        <div className="mt-8">
          <SocialIcons />
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center text-sm" style={{ color: '#89888D' }}>
          <span style={{ userSelect: 'none' }}>¿No tienes cuenta? </span>
          <Link
            href="/registro"
            className="hover:underline transition-colors"
            style={{ color: '#9F00AD' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#D209B6'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#9F00AD'}
          >
            Regístrate
          </Link>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-semibold mb-8 text-center" style={{ color: '#3B3B3B' }}>BIENVENIDO</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Usuario Input */}
            <div>
              <label htmlFor="usuario" className="block font-medium mb-2" style={{ color: '#89888D' }}>
                Usuario:
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  placeholder="Usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, borderColor: '#9F00AD' }}
                  onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                  onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                  required
                />
                <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#9F00AD80' }} />
              </div>
            </div>

            {/* Contraseña Input */}
            <div>
              <label htmlFor="contraseña" className="block font-medium mb-2" style={{ color: '#89888D' }}>
                Contraseña:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="contraseña"
                  name="contraseña"
                  placeholder="Contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, borderColor: '#9F00AD' }}
                  onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                  onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors"
                  style={{ color: '#9F00AD80' }}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white py-4 font-semibold text-lg transition-colors shadow-lg"
              style={{ 
                backgroundColor: '#9F00AD',
                borderRadius: '30px',
                boxShadow: '0 4px 6px -1px rgba(159, 0, 173, 0.3), 0 2px 4px -1px rgba(159, 0, 173, 0.2)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#D209B6';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(210, 9, 182, 0.3), 0 2px 4px -1px rgba(210, 9, 182, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#9F00AD';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(159, 0, 173, 0.3), 0 2px 4px -1px rgba(159, 0, 173, 0.2)';
              }}
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center text-sm" style={{ color: '#89888D' }}>
            <span style={{ userSelect: 'none' }}>¿Olvidaste tu contraseña? </span>
            <a
              href="#"
              className="hover:underline transition-colors"
              style={{ color: '#9F00AD' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#D209B6'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9F00AD'}
            >
              Haz clic aquí
            </a>
          </div>

          {/* Social Icons */}
          <div className="mt-8">
            <SocialIcons />
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center text-sm" style={{ color: '#89888D' }}>
            <span style={{ userSelect: 'none' }}>¿No tienes cuenta? </span>
            <Link
              href="/registro"
              className="hover:underline transition-colors"
              style={{ color: '#9F00AD' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#D209B6'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9F00AD'}
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Right Panel - Branding */}
      <div className="hidden lg:block lg:w-1/2">
        <BrandingPanel activeTab="inicio" onTabChange={(tab) => {
          if (tab === 'registro') router.push('/registro');
        }} />
      </div>
    </div>
  );
}

