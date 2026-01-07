'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import BottomNav from '../../../components/dashboard/BottomNav';
import WhatsAppButton from '../../../components/dashboard/WhatsAppButton';
import { FaShareAlt, FaSearch, FaTimes, FaFilter, FaShoppingCart, FaStar, FaPlus, FaMinus, FaBars, FaCog, FaTrash } from 'react-icons/fa';

// Mock Data
const products = [
    { id: 1, name: 'DETOX - POTE', weight: 'Pote 300 gr.', price: 80.00, points: 40, image: 'https://ik.imagekit.io/dcuhiqwql/PRODUCTOS/detox.jpg?updatedAt=1715228702667', category: 'Salud', color: 'bg-[#FBEBF8]' },
    { id: 2, name: 'COLÁGENO - POTE', weight: 'Pote 300 gr.', price: 80.00, points: 40, image: 'https://ik.imagekit.io/asu/sifrah/products/Disen%CC%83o%20sin%20ti%CC%81tulo%20(4)_7K0mv-mBD.png?updatedAt=1734405281614', category: 'Belleza', color: 'bg-[#FBEBF8]' },
    { id: 3, name: 'LA TRADICIÓN - SACHET', weight: 'Caja 25 Unid.', price: 80.00, points: 40, image: 'https://ik.imagekit.io/dcuhiqwql/PRODUCTOS/sachet%20la%20tradici%C3%B3n%20fondo%20blanco.jpg?updatedAt=1745725819704', category: 'Salud', color: 'bg-[#FBEBF8]' },
    { id: 4, name: 'VIGORPROST', weight: 'Cápsulas 30 unid.', price: 50.00, points: 40, image: 'https://ik.imagekit.io/dcuhiqwql/PRODUCTOS/vogorprost.jpg?updatedAt=1715228732239', category: 'Cápsulas', color: 'bg-[#FBEBF8]' },
    { id: 5, name: 'DETOX - POTE', weight: 'Pote 300 gr.', price: 80.00, points: 40, image: 'https://ik.imagekit.io/dcuhiqwql/PRODUCTOS/detox.jpg?updatedAt=1715228702667', category: 'Salud', color: 'bg-[#FBEBF8]' },
    { id: 6, name: 'COLÁGENO - POTE', weight: 'Pote 300 gr.', price: 80.00, points: 40, image: 'https://ik.imagekit.io/asu/sifrah/products/Disen%CC%83o%20sin%20ti%CC%81tulo%20(4)_7K0mv-mBD.png?updatedAt=1734405281614', category: 'Belleza', color: 'bg-[#FBEBF8]' },
    { id: 7, name: 'LA TRADICIÓN - SACHET', weight: 'Caja 25 Unid.', price: 80.00, points: 40, image: 'https://ik.imagekit.io/dcuhiqwql/PRODUCTOS/sachet%20la%20tradici%C3%B3n%20fondo%20blanco.jpg?updatedAt=1745725819704', category: 'Salud', color: 'bg-[#FBEBF8]' },
    { id: 8, name: 'VIGORPROST', weight: 'Cápsulas 30 unid.', price: 50.00, points: 40, image: 'https://ik.imagekit.io/dcuhiqwql/PRODUCTOS/vogorprost.jpg?updatedAt=1715228732239', category: 'Cápsulas', color: 'bg-[#FBEBF8]' },
    { id: 9, name: 'SÁBILA E - POTE', weight: 'Pote 500 gr.', price: 55.00, points: 25, image: 'https://ik.imagekit.io/dcuhiqwql/PRODUCTOS/detox.jpg?updatedAt=1715228702667', category: 'Salud', color: 'bg-[#FBEBF8]' },
    { id: 10, name: 'CAFÉ GANODERMA', weight: 'Caja 20 Sobres', price: 60.00, points: 30, image: 'https://ik.imagekit.io/asu/sifrah/products/Disen%CC%83o%20sin%20ti%CC%81tulo%20(4)_7K0mv-mBD.png?updatedAt=1734405281614', category: 'Salud', color: 'bg-[#FBEBF8]' },
    { id: 11, name: 'FIBRA ACTIVE', weight: 'Pote 400 gr.', price: 75.00, points: 35, image: 'https://ik.imagekit.io/dcuhiqwql/PRODUCTOS/sachet%20la%20tradici%C3%B3n%20fondo%20blanco.jpg?updatedAt=1745725819704', category: 'Salud', color: 'bg-[#FBEBF8]' },
    { id: 12, name: 'CALCIO MAGNESIO', weight: 'Frasco 60 Caps', price: 45.00, points: 20, image: 'https://ik.imagekit.io/dcuhiqwql/PRODUCTOS/vogorprost.jpg?updatedAt=1715228732239', category: 'Salud', color: 'bg-[#FBEBF8]' },
    { id: 13, name: 'SHAMPOO CRECIMIENTO', weight: 'Frasco 300 ml', price: 35.00, points: 15, image: 'https://ik.imagekit.io/asu/sifrah/products/Disen%CC%83o%20sin%20ti%CC%81tulo%20(4)_7K0mv-mBD.png?updatedAt=1734405281614', category: 'Belleza', color: 'bg-[#FBEBF8]' },
    { id: 14, name: 'ACONDICIONADOR', weight: 'Frasco 300 ml', price: 35.00, points: 15, image: 'https://ik.imagekit.io/asu/sifrah/products/Disen%CC%83o%20sin%20ti%CC%81tulo%20(4)_7K0mv-mBD.png?updatedAt=1734405281614', category: 'Belleza', color: 'bg-[#FBEBF8]' },
    { id: 15, name: 'JABÓN DE GLICERINA', weight: 'Barra 100 gr.', price: 15.00, points: 5, image: 'https://ik.imagekit.io/dcuhiqwql/PRODUCTOS/detox.jpg?updatedAt=1715228702667', category: 'Belleza', color: 'bg-[#FBEBF8]' },
    { id: 16, name: 'CREMA FACIAL', weight: 'Pote 50 gr.', price: 40.00, points: 20, image: 'https://ik.imagekit.io/asu/sifrah/products/Disen%CC%83o%20sin%20ti%CC%81tulo%20(4)_7K0mv-mBD.png?updatedAt=1734405281614', category: 'Belleza', color: 'bg-[#FBEBF8]' },
    { id: 17, name: 'MORINGA EN POLVO', weight: 'Bolsa 200 gr.', price: 25.00, points: 10, image: 'https://ik.imagekit.io/dcuhiqwql/PRODUCTOS/sachet%20la%20tradici%C3%B3n%20fondo%20blanco.jpg?updatedAt=1745725819704', category: 'Salud', color: 'bg-[#FBEBF8]' },
    { id: 18, name: 'ESPIRULINA', weight: 'Frasco 100 Caps', price: 65.00, points: 30, image: 'https://ik.imagekit.io/dcuhiqwql/PRODUCTOS/detox.jpg?updatedAt=1715228702667', category: 'Salud', color: 'bg-[#FBEBF8]' },
    { id: 19, name: 'ACEITE DE COCO', weight: 'Frasco 200 ml', price: 30.00, points: 15, image: 'https://ik.imagekit.io/asu/sifrah/products/Disen%CC%83o%20sin%20ti%CC%81tulo%20(4)_7K0mv-mBD.png?updatedAt=1734405281614', category: 'Salud', color: 'bg-[#FBEBF8]' },
    { id: 20, name: 'BATIDO NUTRICIONAL', weight: 'Pote 600 gr.', price: 90.00, points: 45, image: 'https://ik.imagekit.io/dcuhiqwql/PRODUCTOS/sachet%20la%20tradici%C3%B3n%20fondo%20blanco.jpg?updatedAt=1745725819704', category: 'Salud', color: 'bg-[#FBEBF8]' },
];

const filters = ['Todos', 'Salud', 'Belleza', 'Cápsulas', 'Sachet', 'Promociones'];

interface Product {
    id: number;
    name: string;
    weight: string;
    price: number;
    points: number;
    image: string;
    category: string;
    color: string;
}

interface CartItem {
    product: Product;
    quantity: number;
}

export default function ComprasPage() {
    const [user, setUser] = useState<{ name: string; email: string; code: string } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('Todos');
    const [cart, setCart] = useState<CartItem[]>([]);

    // Cart Logic
    const addToCart = (product: any) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const updateQuantity = (productId: number, delta: number) => {
        setCart((prev) => {
            return prev
                .map((item) => {
                    if (item.product.id === productId) {
                        return { ...item, quantity: item.quantity + delta };
                    }
                    return item;
                })
                .filter((item) => item.quantity > 0);
        });
    };

    const totalPoints = cart.reduce((sum, item) => sum + item.product.points * item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

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


            {/* Main Content */}
            <div className="lg:ml-64 flex flex-col min-h-screen">

                {/* Desktop Header */}
                <Header
                    title="Tienda Sifrah"
                    userCode={user?.code || 'D44F71'}
                    userName={user?.name || 'Sifrah'}
                    userEmail={user?.email || '@gmail.com'}
                />

                <main className="p-4 lg:p-6">
                    {/* Banners Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                        {/* Main Banner - Spans 2 columns on desktop, full on mobile */}
                        {/* Main Banner - Spans 2 columns on desktop, full on mobile */}
                        <div className="lg:col-span-2 relative rounded-md overflow-hidden h-40 lg:h-64 shadow-lg group" style={{ borderRadius: '6px' }}>
                            <Image
                                src="/bannerizquierdo.jpg"
                                alt="Banner Ofertas"
                                fill
                                className="object-cover"
                                priority
                                unoptimized
                                quality={100}
                            />
                        </div>

                        {/* Mobile Grid Split for Secondary Banners */}
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6 lg:col-span-1 lg:contents">
                            {/* Middle Section - Stacked Banners on Desktop */}
                            <div className="lg:col-span-1 flex flex-col gap-4 h-full lg:h-64">

                                <div className="flex-1 rounded-md overflow-hidden relative shadow-md h-32 lg:h-auto" style={{ borderRadius: '6px' }}>
                                    <Image
                                        src="/bannersuperior.jpg"
                                        alt="Crecimiento"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                        quality={100}
                                    />
                                </div>
                                <div className="flex-1 rounded-md overflow-hidden relative shadow-sm h-32 lg:h-auto" style={{ borderRadius: '6px' }}>
                                    <Image
                                        src="/bannerinferior.jpg"
                                        alt="Historias"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                        quality={100}
                                    />
                                </div>
                            </div>

                            {/* Right Banner - Spans 1 column */}
                            <div className="lg:col-span-1 relative rounded-md overflow-hidden h-64 lg:h-64 shadow-lg group" style={{ borderRadius: '6px' }}>
                                <Image
                                    src="/baneerderecho.jpg"
                                    alt="Diamante"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                    quality={100}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Left Column: Catalog */}
                        <div className="lg:col-span-3">
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
                                    <p className="font-bold text-[#1E1E1E] text-sm">Monto: S/.{totalPrice.toFixed(2)}</p>
                                    <p className="font-bold text-[#1E1E1E] text-sm">Puntos: {totalPoints} pts</p>
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
                                        className="w-full pl-10 pr-4 py-2 rounded-[5px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedFilter('Todos');
                                        }}
                                        className="flex items-center gap-1 px-3 py-1 text-sm font-bold text-gray-800 hover:text-gray-600 whitespace-nowrap"
                                    >
                                        <FaTimes size={12} /> Limpiar
                                    </button>
                                    {filters.map(filter => (
                                        <button
                                            key={filter}
                                            onClick={() => setSelectedFilter(filter)}
                                            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedFilter === filter
                                                ? 'bg-transparent text-[#9F00AD] font-bold'
                                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
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
                                    <div key={product.id} className={`${product.color} rounded-xl p-3 lg:p-4 relative group hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#d209b6]`}>
                                        <div className="absolute top-2 right-2 lg:top-4 lg:right-4 bg-purple-700 text-white text-[10px] lg:text-xs font-bold px-2 py-0.5 lg:py-1 rounded-md flex items-center gap-1">
                                            <FaStar size={8} className="lg:hidden" /> <FaStar size={10} className="hidden lg:block" /> 40 pts
                                        </div>

                                        <div className="h-28 lg:h-48 w-full flex items-center justify-center mb-2 lg:mb-4 mt-4 lg:mt-6">
                                            <div className="w-24 h-24 lg:w-40 lg:h-40 bg-white rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain p-2"
                                                />
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

                                        <div className="w-full flex justify-center">
                                            {cart.find((item) => item.product.id === product.id) ? (
                                                <div className="w-1/2 bg-[#EABFFF] rounded-lg flex items-center justify-between px-2 py-1.5 text-purple-900 font-bold shadow-sm mx-auto">
                                                    <button
                                                        onClick={() => updateQuantity(product.id, -1)}
                                                        className="w-6 h-6 flex items-center justify-center bg-white/50 rounded-md hover:bg-white/80 text-[#D209B6]"
                                                    >
                                                        <FaMinus size={10} />
                                                    </button>
                                                    <span className="text-white font-bold">{cart.find((item) => item.product.id === product.id)?.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(product.id, 1)}
                                                        className="w-6 h-6 flex items-center justify-center bg-white/50 rounded-md hover:bg-white/80 text-[#D209B6]"
                                                    >
                                                        <FaPlus size={10} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    className="w-1/2 bg-[#D209B6] hover:bg-[#B00799] text-white font-bold py-1.5 lg:py-2 rounded-lg flex items-center justify-center gap-1 lg:gap-2 transition-colors text-xs lg:text-sm"
                                                >
                                                    <FaShoppingCart size={12} className="lg:hidden" /> <FaShoppingCart size={14} className="hidden lg:block" /> Agregar
                                                </button>
                                            )}
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
                        <div className="hidden lg:block lg:col-span-1 relative">
                            <div className="bg-white rounded-lg border border-gray-100 shadow-sm sticky top-4 z-30">
                                <div className="p-4 border-b border-gray-100 flex flex-col items-center justify-between bg-gray-50 rounded-t-lg relative">
                                    <div className="w-full flex justify-between items-center mb-1">
                                        <div className="flex-1"></div>
                                        <h2 className="text-[#D209B6] text-center text-[18px]" style={{ fontFamily: 'Inter', fontWeight: 700 }}>Carrito de Compras</h2>
                                        <div className="flex-1 flex justify-end">
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <FaTimes size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-[#868686] text-center leading-tight" style={{ fontFamily: 'Inter', fontWeight: 500 }}>Puedes hacer scroll para ver todos tus productos.</p>
                                </div>

                                {cart.length === 0 ? (
                                    <div className="p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
                                        <FaShoppingCart size={56} className="text-gray-200 mb-4" />
                                        <h3 className="text-[#FA8AC0] font-bold mb-1 text-[16px]" style={{ fontFamily: 'Inter', fontWeight: 700 }}>Tu carrito está vacío</h3>
                                        <p className="text-[12px] text-[#757575]" style={{ fontFamily: 'Inter', fontWeight: 500 }}>Agregar productos para comenzar</p>
                                    </div>
                                ) : (
                                    <div className="p-4 flex flex-col gap-4 min-h-[300px] max-h-[500px] overflow-y-auto no-scrollbar">
                                        {cart.map((item) => (
                                            <div key={item.product.id} className="flex items-center gap-3 p-2 border border-pink-100 rounded-lg bg-white shadow-sm relative">
                                                {/* Product Image */}
                                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                                                    <Image
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-contain p-1"
                                                    />
                                                </div>

                                                {/* Details */}
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="uppercase leading-tight mb-1 text-[14px] text-[#000000]" style={{ fontFamily: 'Inter', fontWeight: 700 }}>{item.product.name}</h4>
                                                    <p className="text-[#9F00AD] font-bold text-[17px] mb-0.5">S/{item.product.price.toFixed(2)}</p>
                                                    <span className="text-[14px] bg-[#FBEBF8] text-[#D209B6] font-bold px-1.5 py-0.5 rounded-sm">{item.product.points}pts</span>
                                                </div>

                                                {/* Controls */}
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, -1)}
                                                            className="w-5 h-5 bg-[#D209B6] text-white rounded flex items-center justify-center hover:bg-[#B00799]"
                                                        >
                                                            <FaMinus size={8} />
                                                        </button>
                                                        <span className="w-6 text-center text-[17px] font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, 1)}
                                                            className="w-5 h-5 bg-[#D209B6] text-white rounded flex items-center justify-center hover:bg-[#B00799]"
                                                        >
                                                            <FaPlus size={8} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.product.id)}
                                                        className="text-red-500 hover:text-red-700 transition-colors"
                                                    >
                                                        <FaTrash size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="p-5 bg-[#F9FAFB] border-t border-gray-100 rounded-b-lg">
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#000000] text-[16px]" style={{ fontFamily: 'Inter', fontWeight: 700 }}>Resumen</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#000000] text-[13px]" style={{ fontFamily: 'Inter', fontWeight: 600 }}>Concepto:</span>
                                            <span className="text-[#D209B6] text-[13px]" style={{ fontFamily: 'Inter', fontWeight: 700 }}>Sin Pack</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#000000] text-[13px]" style={{ fontFamily: 'Inter', fontWeight: 600 }}>Puntos:</span>
                                            <span className="text-[#D209B6] text-[13px]" style={{ fontFamily: 'Inter', fontWeight: 700 }}>{totalPoints.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
                                            <span className="text-[#000000] text-[14px]" style={{ fontFamily: 'Inter', fontWeight: 700 }}>Total:</span>
                                            <span className="text-[#D209B6] text-[14px]" style={{ fontFamily: 'Inter', fontWeight: 700 }}>S/. {totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <button className="w-full py-2.5 bg-[#D209B6] text-white text-[16px] font-bold hover:bg-[#B00799] transition-colors rounded-lg shadow-sm" style={{ fontFamily: 'Inter', fontWeight: 700 }}>
                                            Ver detalle
                                        </button>
                                        <button className="w-full py-2.5 bg-[#D209B6] text-white text-[16px] font-bold hover:bg-[#B00799] transition-colors rounded-lg shadow-sm" style={{ fontFamily: 'Inter', fontWeight: 700 }}>
                                            Ir a Pagar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div >

            {/* Mobile Bottom Navigation */}
            < div className="lg:hidden" >
                <BottomNav />
            </div >
            <div className="lg:hidden">
                <WhatsAppButton />
            </div>
        </div >
    );
}
