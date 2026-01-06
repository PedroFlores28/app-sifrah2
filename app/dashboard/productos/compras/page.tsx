'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import BottomNav from '../../../components/dashboard/BottomNav';
import WhatsAppButton from '../../../components/dashboard/WhatsAppButton';
import { FaShareAlt, FaSearch, FaTimes, FaFilter, FaShoppingCart, FaStar, FaPlus, FaMinus, FaBars, FaCog } from 'react-icons/fa';

// Mock Data
const products = [
    { id: 1, name: 'DETOX - POTE', weight: 'Pote 300 gr.', price: 80.00, points: 40, image: '/placeholder-detox.png', category: 'Salud', color: 'bg-purple-100' },
    { id: 2, name: 'COLÁGENO - POTE', weight: 'Pote 300 gr.', price: 80.00, points: 40, image: '/placeholder-colageno.png', category: 'Belleza', color: 'bg-pink-100' },
    { id: 3, name: 'LA TRADICIÓN - SACHET', weight: 'Caja 25 Unid.', price: 80.00, points: 40, image: '/placeholder-tradicion.png', category: 'Salud', color: 'bg-pink-50' },
    { id: 4, name: 'VIGORPROST', weight: 'Cápsulas 30 unid.', price: 50.00, points: 40, image: '/placeholder-vigor.png', category: 'Cápsulas', color: 'bg-pink-50' },
    { id: 5, name: 'DETOX - POTE', weight: 'Pote 300 gr.', price: 80.00, points: 40, image: '/placeholder-detox.png', category: 'Salud', color: 'bg-purple-100' },
    { id: 6, name: 'COLÁGENO - POTE', weight: 'Pote 300 gr.', price: 80.00, points: 40, image: '/placeholder-colageno.png', category: 'Belleza', color: 'bg-pink-100' },
    { id: 7, name: 'LA TRADICIÓN - SACHET', weight: 'Caja 25 Unid.', price: 80.00, points: 40, image: '/placeholder-tradicion.png', category: 'Salud', color: 'bg-pink-50' },
    { id: 8, name: 'VIGORPROST', weight: 'Cápsulas 30 unid.', price: 50.00, points: 40, image: '/placeholder-vigor.png', category: 'Cápsulas', color: 'bg-pink-50' },
    { id: 9, name: 'SÁBILA E - POTE', weight: 'Pote 500 gr.', price: 55.00, points: 25, image: '/placeholder-sabila.png', category: 'Salud', color: 'bg-green-100' },
    { id: 10, name: 'CAFÉ GANODERMA', weight: 'Caja 20 Sobres', price: 60.00, points: 30, image: '/placeholder-cafe.png', category: 'Salud', color: 'bg-orange-100' },
    { id: 11, name: 'FIBRA ACTIVE', weight: 'Pote 400 gr.', price: 75.00, points: 35, image: '/placeholder-fibra.png', category: 'Salud', color: 'bg-yellow-100' },
    { id: 12, name: 'CALCIO MAGNESIO', weight: 'Frasco 60 Caps', price: 45.00, points: 20, image: '/placeholder-calcio.png', category: 'Salud', color: 'bg-blue-100' },
    { id: 13, name: 'SHAMPOO CRECIMIENTO', weight: 'Frasco 300 ml', price: 35.00, points: 15, image: '/placeholder-shampoo.png', category: 'Belleza', color: 'bg-purple-50' },
    { id: 14, name: 'ACONDICIONADOR', weight: 'Frasco 300 ml', price: 35.00, points: 15, image: '/placeholder-acondicionador.png', category: 'Belleza', color: 'bg-pink-50' },
    { id: 15, name: 'JABÓN DE GLICERINA', weight: 'Barra 100 gr.', price: 15.00, points: 5, image: '/placeholder-jabon.png', category: 'Belleza', color: 'bg-yellow-50' },
    { id: 16, name: 'CREMA FACIAL', weight: 'Pote 50 gr.', price: 40.00, points: 20, image: '/placeholder-crema.png', category: 'Belleza', color: 'bg-blue-50' },
    { id: 17, name: 'MORINGA EN POLVO', weight: 'Bolsa 200 gr.', price: 25.00, points: 10, image: '/placeholder-moringa.png', category: 'Salud', color: 'bg-green-50' },
    { id: 18, name: 'ESPIRULINA', weight: 'Frasco 100 Caps', price: 65.00, points: 30, image: '/placeholder-espirulina.png', category: 'Salud', color: 'bg-teal-100' },
    { id: 19, name: 'ACEITE DE COCO', weight: 'Frasco 200 ml', price: 30.00, points: 15, image: '/placeholder-coco.png', category: 'Salud', color: 'bg-gray-100' },
    { id: 20, name: 'BATIDO NUTRICIONAL', weight: 'Pote 600 gr.', price: 90.00, points: 45, image: '/placeholder-batido.png', category: 'Salud', color: 'bg-red-100' },
];

const filters = ['Todos', 'Salud', 'Belleza', 'Cápsulas', 'Sachet', 'Promociones'];

export default function ComprasPage() {
    const [user, setUser] = useState<{ name: string; email: string; code: string } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('Todos');

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans pb-20 lg:pb-0">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            {/* Mobile Header */}
            <header className="lg:hidden bg-[#D209B6] text-white p-4 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-2">
                    <Image src="/logo-sifrah.svg" alt="Sifrah" width={30} height={30} className="brightness-0 invert" />
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-white">
                            <div className="w-full h-full bg-gray-300"></div>
                            {/* Placeholder Avatar */}
                        </div>
                        <div className="text-[10px] leading-tight">
                            <p className="font-bold">Cód: {user?.code || '4715'}</p>
                            <p>{user?.email || '72573398'}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-xl">
                    <FaShareAlt />
                    <FaCog />
                    <FaBars />
                </div>
            </header>

            {/* Main Content */}
            <div className="lg:ml-64 flex flex-col min-h-screen">

                {/* Desktop Header */}
                <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800" style={{ color: '#9F00AD' }}>Tienda Sifrah</h1>

                    <div className="flex items-center gap-4">
                        <button
                            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors"
                            style={{ backgroundColor: '#D209B6' }}
                        >
                            <FaShareAlt size={16} />
                            <span className="font-medium">Compartir Afiliación</span>
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500">
                                <Image src="/logo-sifrah.svg" alt="User" width={40} height={40} className="w-full h-full object-cover p-1" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-gray-800">{user?.name || 'Alberto Ramírez'}</span>
                                <span className="text-xs text-gray-500">{user?.email || 'albertoramirez@gmail.com'}</span>
                            </div>
                            <div className="flex gap-2 text-gray-400">
                                <button><FaStar className="text-yellow-400" /></button>
                                <button><FaFilter /></button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-4 lg:p-6">
                    {/* Banners Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                        {/* Main Banner - Spans 2 columns on desktop, full on mobile */}
                        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden h-40 lg:h-64 bg-gradient-to-r from-purple-800 to-pink-600 flex items-center p-6 lg:p-8 text-white shadow-lg">
                            <div className="z-10 w-2/3">
                                <h2 className="text-xl lg:text-3xl font-extrabold mb-1 lg:mb-2 uppercase italic">Descubre Más Sobre</h2>
                                <h3 className="text-lg lg:text-2xl font-bold italic mb-2 lg:mb-4">Nuestros Productos</h3>
                            </div>
                            <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/10 rounded-l-full blur-xl"></div>
                            {/* Product Images Placeholder */}
                            <div className="absolute bottom-0 right-0 w-1/2 h-full flex items-end justify-center pointer-events-none">
                                <div className="w-full h-24 lg:h-32 bg-contain bg-no-repeat bg-bottom" style={{ backgroundImage: "url('/placeholder-products.png')" }}></div>
                            </div>
                        </div>

                        {/* Mobile Grid Split for Secondary Banners */}
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6 lg:col-span-1 lg:contents">
                            {/* Middle Section - Stacked Banners on Desktop */}
                            <div className="lg:col-span-1 flex flex-col gap-4 h-full lg:h-64">
                                <div className="flex-1 rounded-2xl overflow-hidden bg-gradient-to-r from-pink-500 to-purple-500 p-3 lg:p-4 relative flex items-center text-white shadow-md h-32 lg:h-auto">
                                    <div className="z-10">
                                        <span className="text-[8px] lg:text-[10px] font-bold bg-white text-pink-600 px-2 py-0.5 rounded-full mb-1 inline-block">LO QUE</span>
                                        <h3 className="font-bold text-sm lg:text-lg leading-tight uppercase">TODO <br /> NECESITAS <br /> <span className="text-xs lg:text-sm font-normal normal-case">PARA</span> CRECER</h3>
                                    </div>
                                </div>
                                <div className="flex-1 rounded-2xl overflow-hidden bg-gray-50 p-3 lg:p-4 relative flex items-center shadow-sm border border-gray-100 h-32 lg:h-auto">
                                    <div className="z-10 flex items-center gap-2">
                                        {/* Placeholder Avatar */}
                                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <h3 className="font-bold text-purple-800 leading-tight uppercase text-[10px] lg:text-sm">HISTORIAS QUE <br /> INSPIRAN</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Banner - Spans 1 column */}
                            <div className="lg:col-span-1 relative rounded-2xl overflow-hidden h-64 lg:h-64 bg-purple-900 text-white p-4 lg:p-6 shadow-lg flex flex-col justify-between">
                                <div className="z-10 text-center">
                                    <div className="flex justify-center mb-2">
                                        <Image src="/logo-sifrah.svg" alt="Sifrah" width={40} height={20} className="brightness-0 invert w-10 lg:w-14" />
                                    </div>
                                    <h3 className="font-bold text-xs lg:text-sm uppercase mb-1 leading-tight">Conviértete en Diamante</h3>
                                    <p className="text-[8px] lg:text-[10px] text-white/80 mb-2 uppercase">Con nuestro sistema educativo</p>
                                </div>

                                <div className="flex-1 flex items-center justify-center relative">
                                    {/* Laptop/Books Graphic Placeholder */}
                                    <div className="w-20 lg:w-24 h-16 lg:h-20 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                                        <span className="text-[10px] lg:text-xs">Graphic</span>
                                    </div>
                                </div>

                                <div className="z-10 flex justify-center mt-2">
                                    <button className="bg-[#D209B6] px-3 lg:px-4 py-1 lg:py-1.5 rounded-full text-[8px] lg:text-[10px] font-bold shadow-md hover:bg-[#B00799] transition-colors uppercase">
                                        ¡Descubre Como!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Column: Catalog */}
                        <div className="flex-1">
                            {/* Mobile Filters Layout */}
                            <div className="flex lg:hidden flex-col gap-4 mb-6">
                                <div className="relative w-full">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Búsqueda..."
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50 text-sm"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    <button className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-gray-800 whitespace-nowrap">
                                        <FaTimes size={10} /> Limpiar
                                    </button>
                                    {filters.map(filter => (
                                        <button
                                            key={filter}
                                            onClick={() => setSelectedFilter(filter)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${selectedFilter === filter
                                                ? 'bg-white text-pink-600 border-pink-200 shadow-sm'
                                                : 'bg-white border-gray-200 text-gray-600'
                                                }`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Cart Summary Info */}
                            <div className="lg:hidden flex justify-between items-center mb-4 px-2">
                                <div>
                                    <p className="font-bold text-gray-800 text-sm">Monto: S/.318.00</p>
                                    <p className="font-bold text-gray-600 text-sm">Puntos: 82 pts</p>
                                </div>
                                <button className="bg-[#D209B6] text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 text-sm shadow-md">
                                    <FaShoppingCart /> Ver carrito
                                </button>
                            </div>

                            <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 px-2 lg:px-0">Catálogo de Productos</h2>

                            {/* Desktop Filters */}
                            <div className="hidden lg:flex flex-col md:flex-row gap-4 mb-6 items-center">
                                <div className="relative flex-1 w-full">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Búsqueda..."
                                        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                                    <button className="flex items-center gap-1 px-3 py-1 text-sm font-semibold text-gray-500 hover:text-gray-800 whitespace-nowrap">
                                        <FaTimes size={12} /> Limpiar
                                    </button>
                                    {filters.map(filter => (
                                        <button
                                            key={filter}
                                            onClick={() => setSelectedFilter(filter)}
                                            className={`px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedFilter === filter
                                                ? 'bg-white text-pink-600 font-bold border-b-2 border-pink-600 rounded-none px-2'
                                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-full'
                                                }`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Product Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                                {products.map((product) => (
                                    <div key={product.id} className={`${product.color} rounded-xl p-3 lg:p-4 relative group hover:shadow-lg transition-shadow bg-opacity-30`}>
                                        <div className="absolute top-2 right-2 lg:top-4 lg:right-4 bg-purple-700 text-white text-[10px] lg:text-xs font-bold px-2 py-0.5 lg:py-1 rounded-md flex items-center gap-1">
                                            <FaStar size={8} className="lg:hidden" /> <FaStar size={10} className="hidden lg:block" /> 40 pts
                                        </div>

                                        <div className="h-28 lg:h-40 w-full flex items-center justify-center mb-2 lg:mb-4 mt-4 lg:mt-6">
                                            <div className="w-20 h-20 lg:w-32 lg:h-32 bg-white/40 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                {/* Placeholder for product image */}
                                                <div className="w-12 h-12 lg:w-20 lg:h-20 bg-gray-200 rounded-full animate-pulse"></div>
                                            </div>
                                        </div>

                                        <div className="text-center mb-2 lg:mb-4">
                                            <h3 className="font-bold text-purple-900 uppercase text-xs lg:text-sm mb-0.5 lg:mb-1 leading-tight">{product.name}</h3>
                                            <p className="text-[10px] lg:text-xs text-gray-500">{product.weight}</p>
                                        </div>

                                        <div className="text-center mb-2 lg:mb-4">
                                            <p className="text-[8px] lg:text-[10px] text-gray-500 font-semibold uppercase">Precio Socio:</p>
                                            <p className="text-lg lg:text-xl font-bold text-gray-800">S/. {product.price.toFixed(2)}</p>
                                        </div>

                                        <div className="w-full">
                                            <button className="w-full bg-[#D209B6] hover:bg-[#B00799] text-white font-bold py-1.5 lg:py-2 rounded-lg flex items-center justify-center gap-1 lg:gap-2 transition-colors text-xs lg:text-sm">
                                                <FaShoppingCart size={12} className="lg:hidden" /> <FaShoppingCart size={14} className="hidden lg:block" /> Agregar
                                            </button>
                                        </div>
                                        {/* Mobile Quantity Selector (Hidden by default, shown if added - Mock state) */}
                                        <div className="hidden w-full bg-[#EABFFF] rounded-lg items-center justify-between px-2 py-1 text-purple-900 font-bold">
                                            <button><FaMinus size={10} /></button>
                                            <span>1</span>
                                            <button><FaPlus size={10} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Shopping Cart */}
                        <div className="hidden lg:block w-full lg:w-80 flex-shrink-0">
                            <div className="bg-white rounded-lg border border-gray-100 shadow-sm sticky top-24 z-30">
                                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 rounded-t-lg">
                                    <h2 className="font-bold text-pink-600">Carrito de Compras</h2>
                                    <button className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
                                </div>
                                <div className="bg-gray-50/50 px-4 py-2 text-[10px] text-gray-500 text-center">
                                    Puedes hacer scroll para ver todos tus productos.
                                </div>

                                <div className="p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
                                    <FaShoppingCart size={48} className="text-gray-200 mb-4" />
                                    <h3 className="text-pink-400 font-bold mb-1">Tu carrito está vacío</h3>
                                    <p className="text-xs text-gray-500">Agregar productos para comenzar</p>
                                </div>

                                <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-xs">
                                            <span className="font-bold text-gray-700">Resumen</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-500">Concepto:</span>
                                            <span className="text-pink-600 font-medium">Sin Pack</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-500">Puntos:</span>
                                            <span className="text-gray-700">0.00</span>
                                        </div>
                                        <div className="flex justify-between text-xs font-bold border-t border-gray-200 pt-2">
                                            <span className="text-gray-700">Total:</span>
                                            <span className="text-pink-600">S/. 0.00</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <button className="w-full py-2 bg-[#D209B6] text-white text-xs font-bold hover:bg-[#B00799] transition-colors rounded-lg uppercase">
                                            Ver detalle
                                        </button>
                                        <button className="w-full py-2 bg-[#D209B6] text-white text-xs font-bold hover:bg-[#B00799] transition-colors rounded-lg uppercase">
                                            Ir a Pagar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden">
                <BottomNav />
            </div>
            <div className="lg:hidden">
                <WhatsAppButton />
            </div>
        </div>
    );
}
