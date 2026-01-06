'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import BottomNav from '../../../components/dashboard/BottomNav';
import WhatsAppButton from '../../../components/dashboard/WhatsAppButton';
import { FaSitemap, FaUsers, FaChartPie, FaListUl, FaMapMarkedAlt, FaUser } from 'react-icons/fa';

export default function RedPage() {
    const [user, setUser] = useState<{ name: string; email: string; code: string } | null>(null);
    const [viewMode, setViewMode] = useState<'SELECTION' | 'TREE'>('SELECTION');

    // Tree State
    interface TreeNodeData {
        id: string;
        name: string;
        personalPoints: number;
        groupPoints: number;
        children?: TreeNodeData[];
        isExpanded?: boolean;
    }

    const [treeData, setTreeData] = useState<TreeNodeData | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            // Initialize root node
            setTreeData({
                id: 'root',
                name: parsedUser.name || 'Sifrah',
                personalPoints: 0,
                groupPoints: 955,
                children: [],
                isExpanded: true
            });
        } else {
            setTreeData({
                id: 'root',
                name: 'Sifrah',
                personalPoints: 0,
                groupPoints: 955,
                children: [],
                isExpanded: true
            });
        }
    }, []);

    const cards = [
        { name: 'Red', icon: <FaSitemap size={32} />, color: 'bg-pink-100 text-pink-600' },
        { name: 'Frontales', icon: <FaUsers size={32} />, color: 'bg-pink-100 text-pink-600' },
        { name: 'Niveles', icon: <FaChartPie size={32} />, color: 'bg-pink-100 text-pink-600' },
        { name: 'Actividad', icon: <FaListUl size={32} />, color: 'bg-pink-100 text-pink-600' },
    ];

    // Mock Data Generator
    const generateChildren = (parentId: string, count: number): TreeNodeData[] => {
        return Array.from({ length: count }).map((_, idx) => ({
            id: `${parentId}-${idx}`,
            name: `Usuario ${Math.floor(Math.random() * 1000)}`,
            personalPoints: Math.floor(Math.random() * 100),
            groupPoints: Math.floor(Math.random() * 500),
            children: [], // Start with empty children
            isExpanded: false
        }));
    };

    const toggleNode = (nodeId: string) => {
        const updateNode = (node: TreeNodeData): TreeNodeData => {
            if (node.id === nodeId) {
                // If expanding and has no children, generate mock children
                if (!node.isExpanded && (!node.children || node.children.length === 0)) {
                    return { ...node, isExpanded: true, children: generateChildren(node.id, 3) };
                }
                return { ...node, isExpanded: !node.isExpanded };
            }
            if (node.children) {
                return { ...node, children: node.children.map(updateNode) };
            }
            return node;
        };

        if (treeData) {
            setTreeData(updateNode(treeData));
        }
    };

    // Recursive Tree Node Component
    const TreeNode = ({ node }: { node: TreeNodeData }) => {
        return (
            <div className="flex flex-col items-center">
                <div className="border border-cyan-400 bg-cyan-50/10 rounded-lg p-2 min-w-[180px] shadow-sm relative group hover:shadow-md transition-all">
                    {/* Expand/Collapse Button */}
                    <button
                        onClick={() => toggleNode(node.id)}
                        className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-cyan-500 text-white rounded-md flex items-center justify-center text-sm font-bold shadow-sm hover:bg-cyan-600 z-10"
                    >
                        {node.isExpanded ? '-' : '+'}
                    </button>

                    <div className="flex flex-col items-center text-center">
                        <div className="text-yellow-400 mb-1">
                            <FaUser size={20} />
                        </div>
                        <span className="font-bold text-gray-800 text-sm mb-1">{node.name}</span>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] w-full mt-1">
                            <div className="flex flex-col items-center">
                                <div className="w-2 h-2 rounded-full bg-gray-400 mb-0.5"></div>
                                <span className="text-gray-500">Puntos personales: {node.personalPoints}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-2 h-2 rounded-full bg-gray-400 mb-0.5"></div>
                                <span className="text-cyan-500 font-bold">Total grupal: {node.groupPoints}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Render Children */}
                {node.isExpanded && node.children && node.children.length > 0 && (
                    <div className="flex pt-8 relative">
                        {/* Vertical Line from parent */}
                        <div className="absolute top-0 left-1/2 w-px h-8 bg-gray-300 transform -translate-x-1/2"></div>

                        {/* Horizontal connector line setup */}
                        {node.children.length > 1 && (
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[calc(100%-20px)] border-t border-gray-300"></div>
                        )}

                        {node.children.map((child, index) => (
                            <div key={child.id} className="flex flex-col items-center px-4 relative">
                                {/* Vertical line to child */}
                                <div className="w-px h-8 bg-gray-300 mb-2"></div>
                                <TreeNode node={child} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

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
                <main className="p-4 lg:p-8 flex flex-col items-center min-h-[calc(100vh-80px)]">

                    {viewMode === 'SELECTION' ? (
                        <>
                            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-8 lg:mb-12 uppercase tracking-wide text-center">SELECCIONAR MODO</h2>

                            {/* Cards Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12 w-full max-w-5xl">
                                {cards.map((card) => (
                                    <button
                                        key={card.name}
                                        onClick={() => card.name === 'Red' && setViewMode('TREE')}
                                        className={`flex flex-col items-center justify-center p-4 lg:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${card.color} hover:scale-105 bg-opacity-30 aspect-square lg:aspect-auto cursor-pointer`}
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
                                <button
                                    onClick={() => setViewMode('TREE')}
                                    className="w-full sm:w-auto px-12 py-4 bg-[#D209B6] text-white font-bold text-base lg:text-lg rounded-lg shadow-lg hover:bg-[#B00799] transition-transform hover:scale-105 uppercase flex items-center justify-center gap-3"
                                >
                                    <FaMapMarkedAlt />
                                    MAPA DE LA RED
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="w-full flex flex-col items-center">
                            <div className="w-full flex justify-end mb-4 max-w-6xl">
                                <button
                                    onClick={() => setViewMode('SELECTION')}
                                    className="bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-cyan-600"
                                >
                                    Volver al selector
                                </button>
                            </div>

                            <div className="w-full overflow-x-auto pb-8 flex justify-center">
                                {/* Tree Container */}
                                <div className="min-w-max p-8">
                                    {treeData && <TreeNode node={treeData} />}
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>

            {/* Mobile Elements */}
            <BottomNav />
            <WhatsAppButton />
        </div>
    );
}
