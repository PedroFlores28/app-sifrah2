'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import BottomNav from '../../../components/dashboard/BottomNav';
import WhatsAppButton from '../../../components/dashboard/WhatsAppButton';
import { FaSitemap, FaUsers, FaChartPie, FaListUl, FaMapMarkedAlt } from 'react-icons/fa';

export default function RedPage() {
    const [user, setUser] = useState<{ name: string; email: string; code: string } | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const cards = [
        { name: 'Red', icon: <FaSitemap size={32} />, color: 'bg-pink-100 text-pink-600' },
        { name: 'Frontales', icon: <FaUsers size={32} />, color: 'bg-pink-100 text-pink-600' },
        { name: 'Niveles', icon: <FaChartPie size={32} />, color: 'bg-pink-100 text-pink-600' },
        { name: 'Actividad', icon: <FaListUl size={32} />, color: 'bg-pink-100 text-pink-600' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-20 lg:pb-0">
            {/* Sidebar - Desktop */}
            <Sidebar />

            {/* Main Content */}
            <div className="lg:ml-64 transition-all duration-300">
                {/* Header */}
                <Header
                    title="Red"
                    userCode={user?.code || 'D44F71'}
                    userName={user?.name || 'Sifrah'}
                    userEmail={user?.email || '@gmail.com'}
                />

                {/* Content */}
                <main className="p-4 lg:p-8 flex flex-col items-center">

                    <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-8 lg:mb-12 uppercase tracking-wide text-center">SELECCIONAR MODO</h2>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12 w-full max-w-5xl">
                        {cards.map((card) => (
                            <button
                                key={card.name}
                                className={`flex flex-col items-center justify-center p-4 lg:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${card.color} hover:scale-105 bg-opacity-30 aspect-square lg:aspect-auto`}
                                style={{ backgroundColor: '#FDEEF9' }}
                            >
                                <div className="mb-2 lg:mb-4 text-pink-600 transform scale-75 lg:scale-100">
                                    {card.icon}
                                </div>
                                <span className="font-bold text-gray-800 text-sm lg:text-lg">{card.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 lg:gap-6 mb-8 lg:mb-16 w-full max-w-4xl px-4 lg:px-0">
                        <button className="w-full sm:w-auto px-8 py-3 bg-[#9F00AD] text-white font-semibold rounded-lg shadow-md hover:bg-[#80008A] transition-colors text-sm lg:text-base">
                            Periodos Históricos
                        </button>
                        <button className="w-full sm:w-auto px-8 py-3 bg-[#9F00AD] text-white font-semibold rounded-lg shadow-md hover:bg-[#80008A] transition-colors text-sm lg:text-base">
                            Recuperar Historial
                        </button>
                    </div>

                    {/* Bottom CTA */}
                    <div className="w-full flex justify-center px-4 lg:px-0">
                        <button className="w-full sm:w-auto px-12 py-4 bg-[#D209B6] text-white font-bold text-base lg:text-lg rounded-lg shadow-lg hover:bg-[#B00799] transition-transform hover:scale-105 uppercase flex items-center justify-center gap-3">
                            <FaMapMarkedAlt />
                            MAPA DE LA RED
                        </button>
                    </div>

                </main>
            </div>

            {/* Mobile Elements */}
            <BottomNav />
            <WhatsAppButton />
        </div>
    );
}
