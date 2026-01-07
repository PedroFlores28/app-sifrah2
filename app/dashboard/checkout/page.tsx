'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FaShareAlt, FaCog, FaSignOutAlt, FaTimes, FaWhatsapp, FaMapMarkerAlt, FaChevronDown, FaUser, FaListAlt, FaPhone, FaClock } from 'react-icons/fa';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import BottomNav from '../../components/dashboard/BottomNav';
import WhatsAppButton from '../../components/dashboard/WhatsAppButton';

// Cargar el mapa dinámicamente sin SSR
const MapComponent = dynamic(() => import('../../components/dashboard/MapComponent'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[250px] bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Cargando mapa...</span>
        </div>
    )
});

// Datos de los PDEs (Puntos de Entrega)
const pdeData: { [key: string]: { name: string; address: string; phone: string; schedule: string; lat: number; lng: number; googleMapsUrl: string } } = {
    'ATE VITARTE': {
        name: 'ATE VITARTE',
        address: 'Auxiliar Av. Nicolás Ayllón, Ate 15494',
        phone: '9',
        schedule: 'Coordinar por whats app para recojo',
        lat: -12.0336835,
        lng: -76.9278107,
        googleMapsUrl: 'https://www.google.com/maps/place/Comercial+Dylan+%26+Antonella/@-12.0336782,-76.9326763,17z/data=!3m1!4b1!4m6!3m5!1s0x9105c402e5bc800f:0xbc94930b21e389e4!8m2!3d-12.0336835!4d-76.9278107!16s%2Fg%2F11l_8h1fzs'
    },
    'Lima - Central': {
        name: 'Lima - Central',
        address: 'Av. Principal 123, Lima Centro',
        phone: '999888777',
        schedule: 'Lunes a Viernes 9am - 6pm',
        lat: -12.0464,
        lng: -77.0428,
        googleMapsUrl: 'https://www.google.com/maps/place/Lima'
    },
    'Arequipa - Sede Norte': {
        name: 'Arequipa - Sede Norte',
        address: 'Calle Comercio 456, Arequipa',
        phone: '999777666',
        schedule: 'Lunes a Sábado 10am - 7pm',
        lat: -16.3989,
        lng: -71.5350,
        googleMapsUrl: 'https://www.google.com/maps/place/Arequipa'
    },
    'Trujillo - Sede Principal': {
        name: 'Trujillo - Sede Principal',
        address: 'Jr. Pizarro 789, Trujillo',
        phone: '999666555',
        schedule: 'Lunes a Viernes 8am - 5pm',
        lat: -8.1116,
        lng: -79.0288,
        googleMapsUrl: 'https://www.google.com/maps/place/Trujillo'
    }
};

// Mock Cart Data for Checkout Display - Precios reales del catálogo
const cartItems = [
    {
        id: 1,
        name: 'DETOX - POTE',
        unit: '1 Unid.',
        price: 80.00,
        points: '40pts',
        image: 'https://ik.imagekit.io/dcuhiqwql/PRODUCTOS/detox.jpg?updatedAt=1715228702667'
    },
    {
        id: 2,
        name: 'COLÁGENO - POTE',
        unit: '1 Unid.',
        price: 80.00,
        points: '40pts',
        image: 'https://ik.imagekit.io/asu/sifrah/products/Disen%CC%83o%20sin%20ti%CC%81tulo%20(4)_7K0mv-mBD.png?updatedAt=1734405281614'
    },
    {
        id: 3,
        name: 'LA TRADICIÓN - SACHET',
        unit: '1 Unid.',
        price: 80.00,
        points: '40pts',
        image: 'https://ik.imagekit.io/dcuhiqwql/PRODUCTOS/sachet%20la%20tradici%C3%B3n%20fondo%20blanco.jpg?updatedAt=1745725819704'
    }
];

export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
    const [despachoOption, setDespachoOption] = useState<'tienda' | 'delivery'>('tienda');
    const [selectedPDE, setSelectedPDE] = useState<string>('ATE VITARTE');
    const [facturacionOption, setFacturacionOption] = useState<'boleta' | 'factura'>('boleta');
    const [user, setUser] = useState<{ name: string; email: string; code: string } | null>(null);

    const currentPDE = pdeData[selectedPDE];

    const handleContinue = () => {
        if (currentStep < 3) {
            setCurrentStep((currentStep + 1) as 1 | 2 | 3);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((currentStep - 1) as 1 | 2 | 3);
        }
    };

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

            {/* Main Content */}
            <div className="lg:ml-64 flex flex-col min-h-screen">
                {/* Desktop Header */}
                <Header
                    title={currentStep === 3 ? "Métodos de Pago" : "Checkout"}
                    userCode={user?.code || '4715'}
                    userName={user?.name || 'Sifrah'}
                    userEmail={user?.email || '@gmail.com'}
                />

                <div className="p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Cart Summary (Sidebar-like) */}
                <div className={`lg:col-span-4 space-y-4 order-2 lg:order-1 ${currentStep === 3 ? 'mt-8' : ''}`}>
                    <div className="bg-[#Fdfdfd] border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50">
                            <div>
                                <h2 className="text-[#D209B6] font-bold text-lg leading-none" style={{ fontFamily: 'Inter', fontWeight: 700 }}>Carrito de Compras</h2>
                                <p className="text-[10px] text-gray-400 mt-1">Puedes hacer scroll para ver todos tus productos.</p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <FaTimes size={14} />
                            </button>
                        </div>

                        {/* Cart Items List */}
                        <div className="h-[400px] overflow-y-auto p-4 space-y-3 custom-scrollbar">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-3 p-3 border border-pink-100 rounded-lg bg-white shadow-sm">
                                    <div className="w-20 h-20 bg-gray-50 rounded-md flex items-center justify-center relative overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <p className="text-[10px] text-gray-500 mb-0.5">{item.unit}</p>
                                        <h3 className="text-sm font-bold text-gray-800 uppercase leading-tight mb-1">{item.name}</h3>
                                        <p className="text-[#D209B6] font-bold text-sm">S/{item.price.toFixed(2)}</p>
                                        <span className="text-[10px] bg-[#FBEBF8] text-[#D209B6] px-1.5 py-0.5 rounded w-fit mt-1 font-bold">{item.points}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Footer */}
                        <div className="p-5 bg-gray-50 border-t border-gray-100">
                            {currentStep < 3 ? (
                                <>
                                    <h3 className="font-bold text-lg mb-3 text-gray-800">Resumen</h3>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-gray-700">Concepto:</span>
                                        <span className="text-sm font-bold text-[#D209B6]">Sin Pack</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-semibold text-gray-700">Puntos:</span>
                                        <span className="text-sm font-bold text-[#D209B6]">120.00</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                        <span className="text-base font-bold text-gray-800">Total:</span>
                                        <span className="text-base font-bold text-[#D209B6]">S/. 240.00</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-gray-700">Concepto:</span>
                                        <span className="text-sm font-bold text-[#D209B6]">Afiliación</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-gray-700">Fecha Compra:</span>
                                        <span className="text-sm font-bold text-[#D209B6]">2025-08-29 11:48:04</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-gray-700">Estado:</span>
                                        <span className="text-sm font-bold text-[#D209B6]">Pendiente de Pago</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-gray-700">Puntos:</span>
                                        <span className="text-sm font-bold text-[#D209B6]">120.00</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                        <span className="text-base font-bold text-gray-800">Total:</span>
                                        <span className="text-base font-bold text-[#D209B6]">S/. 240.00</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-xs text-gray-500 mb-2">¿Olvidaste algún producto?</p>
                        <Link href="/dashboard/productos/compras">
                            <button className="w-full bg-[#D209B6] hover:bg-[#B00799] text-white font-bold py-3 rounded-md transition-colors shadow-md">
                                Volver a la Tienda
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Right Column: Checkout Steps & Form */}
                <div className="lg:col-span-8 order-1 lg:order-2">
                    {/* Steps Indicator - Solo visible en pasos 1 y 2 */}
                    {currentStep < 3 && (
                    <div className="flex justify-center items-center mb-12 px-4">
                        {/* Paso 1 */}
                        <div className="flex flex-col items-center relative">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg z-10 ${currentStep >= 1 ? 'bg-[#D209B6] text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>1</div>
                            <span className={`text-xs mt-3 ${currentStep >= 1 ? 'font-bold text-gray-600' : 'text-gray-400'}`}>Despacho</span>
                        </div>
                        {/* Conector 1-2 */}
                        <div className={`w-32 h-[10px] mx-1 mb-6 rounded-full ${currentStep >= 2 ? 'bg-[#D209B6]' : 'bg-gray-300'}`}></div>
                        {/* Paso 2 */}
                        <div className="flex flex-col items-center relative">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg z-10 ${currentStep >= 2 ? 'bg-[#D209B6] text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>2</div>
                            <span className={`text-xs mt-3 ${currentStep >= 2 ? 'font-bold text-gray-600' : 'text-gray-400'}`}>Facturación</span>
                        </div>
                        {/* Conector 2-3 */}
                        <div className={`w-32 h-[10px] mx-1 mb-6 rounded-full ${currentStep >= 3 ? 'bg-[#D209B6]' : 'bg-gray-300'}`}></div>
                        {/* Paso 3 */}
                        <div className="flex flex-col items-center relative">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg z-10 ${currentStep >= 3 ? 'bg-[#D209B6] text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>3</div>
                            <span className={`text-xs mt-3 ${currentStep >= 3 ? 'font-bold text-gray-600' : 'text-gray-400'}`}>Pago</span>
                        </div>
                    </div>
                    )}

                    {/* Main Card */}
                    <div className="bg-white rounded-lg pt-4 pb-8">
                        {/* PASO 1: DESPACHO */}
                        {currentStep === 1 && (
                        <>
                        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                            {/* Pink Header - Opciones de Despacho */}
                            <div className="bg-[#D209B6] text-white px-6 py-3">
                                <h2 className="font-bold text-lg">Opciones de Despacho</h2>
                            </div>

                            <div className="p-6">
                                <p className="text-sm text-gray-600 mb-4">Elije tu método de despacho preferido.</p>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setDespachoOption('tienda')}
                                        className={`px-10 py-4 text-base font-bold transition-all border-2 ${despachoOption === 'tienda' 
                                            ? 'bg-[#D209B6] text-white border-[#D209B6]' 
                                            : 'bg-white text-gray-500 border-gray-300'}`}
                                        style={{ borderRadius: '8px' }}
                                    >
                                        Retira tu Compra
                                    </button>
                                    <button
                                        onClick={() => setDespachoOption('delivery')}
                                        className={`px-10 py-4 text-base font-bold transition-all border-2 ${despachoOption === 'delivery' 
                                            ? 'bg-[#D209B6] text-white border-[#D209B6]' 
                                            : 'bg-white text-gray-500 border-gray-300'}`}
                                        style={{ borderRadius: '8px' }}
                                    >
                                        Delivery
                                    </button>
                                </div>
                            </div>

                            {/* Línea divisora magenta */}
                            <div className="h-[4px] bg-[#D209B6] w-full"></div>

                            {/* Opción: Retira tu Compra */}
                            {despachoOption === 'tienda' && (
                                <div className="p-6">
                                    {/* Seleccione el PDE */}
                                    <div className="bg-[#FBEBF8] rounded-xl px-6 py-4 mb-6 border-l-4 border-[#D209B6]">
                                        <h3 className="text-[#D209B6] font-bold text-lg">Seleccione el PDE</h3>
                                    </div>

                                    <div className="relative mb-8">
                                        <select 
                                            className="w-full p-4 border border-gray-200 rounded-xl appearance-none text-gray-700 text-sm focus:outline-none focus:border-[#D209B6] bg-[#F9F9F9] cursor-pointer font-medium"
                                            value={selectedPDE}
                                            onChange={(e) => setSelectedPDE(e.target.value)}
                                        >
                                            <option>ATE VITARTE</option>
                                            <option>Lima - Central</option>
                                            <option>Arequipa - Sede Norte</option>
                                            <option>Trujillo - Sede Principal</option>
                                        </select>
                                        <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                                    </div>

                                    {/* Ubicación en mapa */}
                                    <h3 className="text-gray-800 font-bold text-lg mb-4">Ubicación en mapa</h3>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Mapa */}
                                        <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm" style={{ height: '280px' }}>
                                            <MapComponent 
                                                lat={currentPDE.lat}
                                                lng={currentPDE.lng}
                                                title={currentPDE.name}
                                                address={currentPDE.address}
                                                phone={currentPDE.phone}
                                            />
                                        </div>

                                        {/* Información del PDE */}
                                        <div>
                                            <h4 className="text-[#D209B6] font-bold text-lg mb-4">{currentPDE.name}</h4>
                                            
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border-l-4 border-[#D209B6]">
                                                    <span className="text-[#D209B6] font-semibold text-sm min-w-[80px]">Dirección:</span>
                                                    <span className="text-gray-600 text-sm">{currentPDE.address}</span>
                                                </div>
                                                
                                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border-l-4 border-[#D209B6]">
                                                    <span className="text-[#D209B6] font-semibold text-sm min-w-[80px]">Teléfono:</span>
                                                    <span className="text-gray-600 text-sm">{currentPDE.phone}</span>
                                                </div>
                                                
                                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border-l-4 border-[#D209B6]">
                                                    <span className="text-[#D209B6] font-semibold text-sm min-w-[80px]">Horario:</span>
                                                    <span className="text-gray-600 text-sm">{currentPDE.schedule}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Enlace a Google Maps */}
                                    <div className="mt-6">
                                        <p className="text-gray-700 font-semibold text-sm mb-2">Ubicación en Mapa:</p>
                                        <a 
                                            href={currentPDE.googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#D209B6] hover:text-[#B00799] text-sm font-medium underline flex items-center gap-2"
                                        >
                                            <FaMapMarkerAlt size={14} />
                                            Ver en Google Maps
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Opción: Delivery */}
                            {despachoOption === 'delivery' && (
                                <div className="p-6">
                                    {/* Información del Receptor */}
                                    <div className="bg-[#FBEBF8] rounded-xl px-6 py-4 mb-6 border-l-4 border-[#D209B6]">
                                        <h3 className="text-[#D209B6] font-bold text-lg">Información del Receptor</h3>
                                    </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Receptor</label>
                                                <div className="relative">
                                                    <input 
                                                        type="text" 
                                                        placeholder="Nombre Completo"
                                                        className="w-full p-4 border border-gray-200 rounded-xl text-gray-500 text-sm focus:outline-none focus:border-[#D209B6] bg-[#F9F9F9] pr-12"
                                                    />
                                                    <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Documento</label>
                                                <div className="relative">
                                                    <input 
                                                        type="text" 
                                                        placeholder="Nro. de Documento"
                                                        className="w-full p-4 border border-gray-200 rounded-xl text-gray-500 text-sm focus:outline-none focus:border-[#D209B6] bg-[#F9F9F9] pr-12"
                                                    />
                                                    <FaListAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Celular Receptor</label>
                                            <div className="relative">
                                                <input 
                                                    type="tel" 
                                                    placeholder="Celular Receptor"
                                                    className="w-full p-4 border border-gray-200 rounded-xl text-gray-500 text-sm focus:outline-none focus:border-[#D209B6] bg-[#F9F9F9] pr-12"
                                                />
                                                <FaPhone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                            </div>
                                        </div>

                                        {/* Ubicación de Entrega */}
                                        <div className="bg-[#FBEBF8] rounded-xl px-6 py-4 mb-6 border-l-4 border-[#D209B6]">
                                            <h3 className="text-[#D209B6] font-bold text-lg">Ubicación de Entrega</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Departamento</label>
                                                <div className="relative">
                                                    <select className="w-full p-4 border border-gray-200 rounded-xl appearance-none text-gray-500 text-sm focus:outline-none focus:border-[#D209B6] bg-[#F9F9F9] cursor-pointer">
                                                        <option>Selecciona</option>
                                                        <option>Lima</option>
                                                        <option>Arequipa</option>
                                                        <option>Cusco</option>
                                                        <option>Trujillo</option>
                                                    </select>
                                                    <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Provincia</label>
                                                <div className="relative">
                                                    <select className="w-full p-4 border border-gray-200 rounded-xl appearance-none text-gray-500 text-sm focus:outline-none focus:border-[#D209B6] bg-[#F9F9F9] cursor-pointer">
                                                        <option>Selecciona</option>
                                                        <option>Lima</option>
                                                        <option>Callao</option>
                                                    </select>
                                                    <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Distrito</label>
                                            <div className="relative">
                                                <select className="w-full p-4 border border-gray-200 rounded-xl appearance-none text-gray-500 text-sm focus:outline-none focus:border-[#D209B6] bg-[#F9F9F9] cursor-pointer">
                                                    <option>Selecciona</option>
                                                    <option>Miraflores</option>
                                                    <option>San Isidro</option>
                                                    <option>Surco</option>
                                                    <option>La Molina</option>
                                                </select>
                                                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                                            </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 px-2">
                            <button 
                                onClick={handleContinue}
                                className="bg-gray-200 hover:bg-[#D209B6] hover:text-white text-gray-500 font-bold py-3 px-12 rounded-lg shadow-sm flex items-center gap-2 transition-all"
                            >
                                Continuar <span className="text-lg">&gt;&gt;</span>
                            </button>
                        </div>
                        </>
                        )}

                        {/* PASO 2: FACTURACIÓN */}
                        {currentStep === 2 && (
                        <>
                        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                            {/* Pink Header - Facturación */}
                            <div className="bg-[#D209B6] text-white px-6 py-3">
                                <h2 className="font-bold text-lg">Facturación</h2>
                            </div>

                            <div className="p-6">
                                <p className="text-sm text-gray-600 mb-4">Elije entre boleta y factura.</p>

                                <div className="flex gap-4 mb-6">
                                    <button
                                        onClick={() => setFacturacionOption('boleta')}
                                        className={`flex-1 py-4 text-base font-bold transition-all border-2 ${facturacionOption === 'boleta' 
                                            ? 'bg-[#D209B6] text-white border-[#D209B6]' 
                                            : 'bg-gray-200 text-gray-500 border-gray-200'}`}
                                        style={{ borderRadius: '8px' }}
                                    >
                                        Boleta
                                    </button>
                                    <button
                                        onClick={() => setFacturacionOption('factura')}
                                        className={`flex-1 py-4 text-base font-bold transition-all border-2 ${facturacionOption === 'factura' 
                                            ? 'bg-[#D209B6] text-white border-[#D209B6]' 
                                            : 'bg-gray-200 text-gray-500 border-gray-200'}`}
                                        style={{ borderRadius: '8px' }}
                                    >
                                        Factura
                                    </button>
                                </div>

                                {/* Campo Documento */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Documento</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            placeholder="Nro. de Documento"
                                            className="w-full p-4 border border-gray-200 rounded-xl text-gray-500 text-sm focus:outline-none focus:border-[#D209B6] bg-[#F9F9F9] pr-12"
                                        />
                                        <FaListAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Línea divisora */}
                        <div className="border-t-2 border-[#D209B6] my-6"></div>

                        {/* Botones de navegación */}
                        <div className="flex justify-between items-center px-2">
                            <button 
                                onClick={handleContinue}
                                className="bg-gray-200 hover:bg-[#D209B6] hover:text-white text-gray-500 font-bold py-3 px-12 rounded-lg shadow-sm flex items-center gap-2 transition-all"
                            >
                                Continuar <span className="text-lg">&gt;&gt;</span>
                            </button>
                            <button 
                                onClick={handleBack}
                                className="bg-[#D209B6] hover:bg-[#B00799] text-white font-bold py-3 px-8 rounded-lg shadow-sm flex items-center gap-2 transition-all"
                            >
                                <span className="text-lg">&lt;&lt;</span> Regresar
                            </button>
                        </div>
                        </>
                        )}

                        {/* PASO 3: MÉTODOS DE PAGO */}
                        {currentStep === 3 && (
                        <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start mt-4">
                            {/* Columna 1: Datos de Despacho - misma altura que el carrito (aprox 650px) */}
                            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col" style={{ minHeight: '650px' }}>
                                <div className="bg-[#D209B6] text-white px-4 py-3">
                                    <h3 className="font-bold text-sm">Datos de Despacho</h3>
                                </div>
                                <div className="p-4 space-y-4 flex-1 flex flex-col">
                                    <div>
                                        <p className="text-xs text-[#D209B6] font-semibold">Recojo en:</p>
                                        <p className="text-sm text-gray-800 font-medium">PDE {currentPDE.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#D209B6] font-semibold">Dirección:</p>
                                        <p className="text-sm text-gray-600">{currentPDE.address}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#D209B6] font-semibold">Teléfono:</p>
                                        <p className="text-sm text-gray-600 flex items-center gap-2">
                                            +51 959 141 444 
                                            <FaWhatsapp className="text-green-500" size={14} />
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#D209B6] font-semibold">Horario:</p>
                                        <p className="text-sm text-gray-600">Atención previa coordinación por WhatsApp</p>
                                        <p className="text-sm text-gray-600">L - V: 9 am a 6 pm</p>
                                    </div>
                                    <div className="flex-1 flex flex-col mt-2">
                                        <p className="text-xs text-[#D209B6] font-semibold mb-2">Ubicación en Mapa:</p>
                                        <div className="w-full flex-1 rounded-lg overflow-hidden border border-gray-200" style={{ minHeight: '350px' }}>
                                            <MapComponent 
                                                lat={currentPDE.lat}
                                                lng={currentPDE.lng}
                                                title={currentPDE.name}
                                                address={currentPDE.address}
                                                phone={currentPDE.phone}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Columna 2: Datos Comprobante + Método de Pago */}
                            <div className="space-y-4">
                                {/* Datos Comprobante */}
                                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                    <div className="bg-[#D209B6] text-white px-4 py-3">
                                        <h3 className="font-bold text-sm">Datos Comprobante</h3>
                                    </div>
                                    <div className="p-4">
                                        <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                                            <div>
                                                <p className="text-[#D209B6] font-semibold">Tipo Documento:</p>
                                                <p className="text-gray-600">{facturacionOption === 'boleta' ? 'Boleta' : 'Factura'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[#D209B6] font-semibold">Serie:</p>
                                                <p className="text-gray-600">---</p>
                                            </div>
                                            <div>
                                                <p className="text-[#D209B6] font-semibold">Correlativo:</p>
                                                <p className="text-gray-600">---</p>
                                            </div>
                                        </div>
                                        <div className="text-xs">
                                            <p className="text-[#D209B6] font-semibold">Nro. Documento:</p>
                                            <p className="text-gray-600">72573398</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Método de Pago */}
                                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                    <div className="bg-[#D209B6] text-white px-4 py-3">
                                        <h3 className="font-bold text-sm">Método de Pago</h3>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-xs text-gray-600 mb-4">Elije el método de pago que más te convenga.</p>
                                        
                                        <div className="space-y-3">
                                            {/* Opción 1: Saldo disponible */}
                                            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D209B6] transition-all">
                                                <input type="radio" name="metodoPago" value="saldo" className="w-4 h-4 text-[#D209B6]" />
                                                <span className="text-sm text-gray-700">Usar mi saldo disponible</span>
                                            </label>
                                            
                                            {/* Opción 2: Comprobante */}
                                            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D209B6] transition-all">
                                                <input type="radio" name="metodoPago" value="comprobante" className="w-4 h-4 text-[#D209B6]" />
                                                <svg className="w-5 h-5 text-[#D209B6]" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2z"/>
                                                </svg>
                                                <span className="text-sm text-gray-700">Pago con Comprobante</span>
                                            </label>
                                            
                                            {/* Opción 3: Tarjeta */}
                                            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D209B6] transition-all">
                                                <input type="radio" name="metodoPago" value="tarjeta" className="w-4 h-4 text-[#D209B6]" />
                                                <svg className="w-5 h-5 text-[#D209B6]" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                                                </svg>
                                                <span className="text-sm text-gray-700">Pago con Tarjeta de Crédito / Débito</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botón de navegación - Solo Regresar */}
                        <div className="flex justify-end items-center mt-8 px-2">
                            <button 
                                onClick={handleBack}
                                className="bg-[#D209B6] hover:bg-[#B00799] text-white font-bold py-3 px-8 rounded-lg shadow-sm flex items-center gap-2 transition-all"
                            >
                                <span className="text-lg">&lt;&lt;</span> Regresar
                            </button>
                        </div>
                        </>
                        )}
                    </div>
                </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden">
                <BottomNav />
            </div>

            {/* Floating WhatsApp Button */}
            <WhatsAppButton />
        </div>
    );
}
