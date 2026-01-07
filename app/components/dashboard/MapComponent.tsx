'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
    lat: number;
    lng: number;
    title: string;
    address: string;
    phone: string;
}

export default function MapComponent({ lat, lng, title, address, phone }: MapComponentProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current && !mapInstanceRef.current) {
            // Crear el mapa
            const map = L.map(mapRef.current).setView([lat, lng], 16);

            // Añadir capa de OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Crear icono personalizado magenta
            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="
                    background-color: #D209B6;
                    width: 30px;
                    height: 30px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    border: 3px solid white;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                "></div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30]
            });

            // Añadir marcador con popup
            const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
            
            // Popup con información
            const popupContent = `
                <div style="text-align: center; min-width: 150px;">
                    <strong style="color: #D209B6; font-size: 12px;">${title}</strong><br/>
                    <span style="font-size: 11px; color: #666;">${address}</span><br/>
                    <span style="font-size: 11px; color: #666;">📞 ${phone}</span>
                </div>
            `;
            
            marker.bindPopup(popupContent).openPopup();

            mapInstanceRef.current = map;
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [lat, lng, title, address, phone]);

    return (
        <div 
            ref={mapRef} 
            className="w-full h-full rounded-lg"
            style={{ minHeight: '250px' }}
        />
    );
}

