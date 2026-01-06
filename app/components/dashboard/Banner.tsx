'use client';

import React, { useState, useEffect } from 'react';

const bannerImages = [
  {
    id: 1,
    gradient: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
    title: 'PROMO NAVIDEÑA',
    subtitle: '¡Aprovecha los descuentos!',
  },
  {
    id: 2,
    gradient: 'linear-gradient(135deg, #E91E63 0%, #9C27B0 100%)',
    title: 'SUPER PROMOCIÓN',
    subtitle: 'Productos exclusivos',
  },
  {
    id: 3,
    gradient: 'linear-gradient(135deg, #FF9800 0%, #F44336 100%)',
    title: 'OFERTAS ESPECIALES',
    subtitle: 'Solo por tiempo limitado',
  },
  {
    id: 4,
    gradient: 'linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)',
    title: 'NUEVOS PRODUCTOS',
    subtitle: 'Descubre lo nuevo',
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerImages.map((banner) => (
          <div
            key={banner.id}
            className="w-full flex-shrink-0 h-48 lg:h-64 flex items-center justify-center relative"
            style={{ background: banner.gradient }}
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full" />
              <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full" />
            </div>
            
            {/* Content */}
            <div className="text-center text-white relative z-10 px-4">
              <h2 className="text-2xl lg:text-4xl font-bold mb-2 drop-shadow-lg">
                {banner.title}
              </h2>
              <p className="text-lg lg:text-xl opacity-90">{banner.subtitle}</p>
              <button className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full font-semibold transition-colors backdrop-blur-sm">
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-blue-500 w-6' 
                : 'bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

