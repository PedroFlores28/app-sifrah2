'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import BottomNav from '../components/dashboard/BottomNav';
import Banner from '../components/dashboard/Banner';
import WhatsAppButton from '../components/dashboard/WhatsAppButton';
import NivelActualCard from '../components/dashboard/cards/NivelActualCard';
import RangoDiamanteCard from '../components/dashboard/cards/RangoDiamanteCard';
import PackAfiliacionCard from '../components/dashboard/cards/PackAfiliacionCard';
import ComisionesCard from '../components/dashboard/cards/ComisionesCard';
import BonoViajeCard from '../components/dashboard/cards/BonoViajeCard';
import UltimosIngresosCard from '../components/dashboard/cards/UltimosIngresosCard';
import TotalGanadoCard from '../components/dashboard/cards/TotalGanadoCard';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string; code: string } | null>(null);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');

    if (!isAuthenticated || isAuthenticated !== 'true') {
      router.push('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <Header 
          title="Dashboard"
          userCode={user?.code || 'D44F71'}
          userName={user?.name || 'Sifrah'}
          userEmail={user?.email || '@gmail.com'}
        />

        {/* Content */}
        <main className="p-4 lg:p-8 pb-24 lg:pb-8">
          {/* Banner */}
          <div className="mb-6">
            <Banner />
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <NivelActualCard />
              <PackAfiliacionCard />
              <UltimosIngresosCard />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <RangoDiamanteCard />
              <ComisionesCard />
              <BonoViajeCard />
              <TotalGanadoCard />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-4">
            <NivelActualCard />
            <RangoDiamanteCard />
            <PackAfiliacionCard />
            <ComisionesCard />
            <BonoViajeCard />
            <UltimosIngresosCard />
            <TotalGanadoCard />
          </div>
        </main>
      </div>

      {/* Bottom Navigation - Mobile */}
      <BottomNav />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}


