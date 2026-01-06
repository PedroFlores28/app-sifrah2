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
        {
            name: 'Red',
            icon: (
                <svg width="110" height="95" viewBox="0 0 110 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.9907 77.71C31.1449 77.71 33.7126 80.4831 33.7126 83.8896V84.7725H19V83.8896C19 80.4832 21.5662 77.7102 24.721 77.71H27.9907Z" fill="#D209B6" />
                    <path d="M26.3559 68C28.3837 68 30.0343 69.7826 30.0343 71.9727C30.034 74.1626 28.3836 75.9443 26.3559 75.9443C24.3282 75.9442 22.6786 74.1625 22.6784 71.9727C22.6784 69.7826 24.3281 68.0001 26.3559 68Z" fill="#D209B6" />
                    <path d="M27.1055 66.8535H26.1795V60.2861H27.1055V66.8535Z" fill="#D209B6" />
                    <path d="M27.9943 52.7139C31.1493 52.7139 33.7169 55.4872 33.7172 58.8945V59.7783H19.0009V58.8945C19.0011 55.4872 21.568 52.7139 24.7237 52.7139H27.9943Z" fill="#D209B6" />
                    <path d="M84.6612 52.7139C87.8161 52.714 90.3838 55.4873 90.384 58.8945V59.7783H75.6669V58.8945C75.6671 55.4872 78.2348 52.7139 81.3906 52.7139H84.6612Z" fill="#D209B6" />
                    <path d="M56.3273 52.7139C59.4824 52.7139 62.0509 55.4871 62.051 58.8945V59.7773H47.3339V58.8945C47.334 55.4872 49.901 52.7141 53.0567 52.7139H56.3273Z" fill="#D209B6" />
                    <path d="M26.3595 43.001C28.3878 43.0012 30.0379 44.784 30.0379 46.9746C30.0377 49.1651 28.3877 50.948 26.3595 50.9482C24.3311 50.9482 22.6804 49.1652 22.6802 46.9746C22.6802 44.7838 24.331 43.001 26.3595 43.001Z" fill="#D209B6" />
                    <path d="M83.0254 43.001C85.0539 43.001 86.7047 44.7838 86.7047 46.9746C86.7045 49.1652 85.0538 50.9482 83.0254 50.9482C80.9972 50.9481 79.3463 49.1651 79.3461 46.9746C79.3461 44.7839 80.9971 43.0011 83.0254 43.001Z" fill="#D209B6" />
                    <path d="M54.6925 43C56.7208 43 58.3716 44.7831 58.3717 46.9736C58.3717 49.1644 56.7209 50.9472 54.6925 50.9473C52.664 50.9473 51.0132 49.1644 51.0132 46.9736C51.0134 44.783 52.6641 43 54.6925 43Z" fill="#D209B6" />
                    <path d="M55.5316 31.75H82.0887C82.3401 31.75 82.7146 31.8191 83.0417 32.0449C83.3938 32.2882 83.6773 32.709 83.6774 33.3301V41.6104H82.7514V33.3301C82.7514 33.0875 82.6594 32.9674 82.5426 32.8867C82.4009 32.7891 82.2123 32.7501 82.0887 32.75H55.5316V41.6104H54.6057V32.75H27.6733C27.4097 32.7501 27.2673 32.8748 27.1688 33.0498C27.0553 33.2513 27.0106 33.5152 27.0105 33.6904V41.6104H26.0846V33.6904C26.0846 33.3856 26.1534 32.9286 26.3776 32.5303C26.6167 32.1056 27.0368 31.7501 27.6733 31.75H54.6057V27.21H55.5316V31.75Z" fill="#D209B6" />
                    <path d="M56.3237 19.71C59.4779 19.71 62.0456 22.4831 62.0456 25.8896V26.7725H47.333V25.8896C47.333 22.4831 49.8999 19.71 53.0549 19.71H56.3237Z" fill="#D209B6" />
                    <path d="M54.6897 10C56.7175 10.0002 58.3672 11.7827 58.3672 13.9727C58.367 16.1624 56.7173 17.9441 54.6897 17.9443C52.662 17.9443 51.0116 16.1626 51.0114 13.9727C51.0114 11.7826 52.6619 10 54.6897 10Z" fill="#D209B6" />
                </svg>
            ),
            color: 'bg-pink-100 text-pink-600'
        },
        {
            name: 'Frontales',
            icon: (
                <svg width="110" height="91" viewBox="0 0 110 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M56.0693 32.7549H84.665C84.943 32.7549 85.3521 32.8311 85.707 33.0762C86.0883 33.3395 86.3779 33.7809 86.3779 34.418V43.333H85.3779V34.418C85.3779 34.1247 85.2625 33.9839 85.1387 33.8984C84.9885 33.7948 84.7911 33.7549 84.665 33.7549H56.0693V43.333H55.0693V33.7549H26.0684C25.8043 33.7551 25.6488 33.8784 25.5342 34.082C25.4064 34.3096 25.3564 34.6065 25.3564 34.8057V43.333H24.3564V34.8057C24.3564 34.4884 24.4278 34.009 24.6631 33.5908C24.912 33.1488 25.3634 32.7552 26.0684 32.7549H55.0693V27.8281H56.0693V32.7549Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M26.167 53.166C29.3827 53.1662 32 55.7843 32 59V59.833H17V59C17 55.7843 19.6165 53.1662 22.833 53.166H26.167Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M57.167 53.166C60.3827 53.1662 63 55.7843 63 59V59.833H48V59C48 55.7843 50.6165 53.1662 53.833 53.166H57.167Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M88.167 53.166C91.3827 53.1662 94 55.7843 94 59V59.833H79V59C79 55.7843 81.6165 53.1662 84.833 53.166H88.167Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M24.5 44C26.5675 44 28.25 45.6825 28.25 47.75C28.2498 49.8174 26.5674 51.5 24.5 51.5C22.4326 51.5 20.7502 49.8174 20.75 47.75C20.75 45.6825 22.4325 44 24.5 44Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M55.5 44C57.5675 44 59.25 45.6825 59.25 47.75C59.2498 49.8174 57.5674 51.5 55.5 51.5C53.4326 51.5 51.7502 49.8174 51.75 47.75C51.75 45.6825 53.4325 44 55.5 44Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M86.5 44C88.5675 44 90.25 45.6825 90.25 47.75C90.2498 49.8174 88.5674 51.5 86.5 51.5C84.4326 51.5 82.7502 49.8174 82.75 47.75C82.75 45.6825 84.4325 44 86.5 44Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M57.167 19.166C60.3827 19.1662 63 21.7843 63 25V25.833H48V25C48 21.7843 50.6165 19.1662 53.833 19.166H57.167Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M55.5 10C57.5675 10 59.25 11.6825 59.25 13.75C59.2498 15.8174 57.5674 17.5 55.5 17.5C53.4326 17.5 51.7502 15.8174 51.75 13.75C51.75 11.6825 53.4325 10 55.5 10Z" fill="#D209B6" fillOpacity="0.5" />
                </svg>
            ),
            color: 'bg-pink-100 text-pink-600'
        },
        {
            name: 'Niveles',
            icon: (
                <svg width="110" height="92" viewBox="0 0 110 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42.6283 40.5965C41.3305 42.7605 40.584 45.293 40.584 48C40.584 53.6487 43.8334 58.5375 48.5644 60.9019L40.5548 78.787C29 73.3561 21 61.6126 21 48C21 43.0854 22.0429 38.4144 23.9192 34.196L42.6283 40.5965Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M55.3724 33.5888L55.2593 14.0011C55.1729 14.0004 55.0865 14 55 14C41.3311 14 29.5458 22.0662 24.145 33.6982L42.9252 40.1232C45.4988 36.186 49.9453 33.584 55 33.584C55.1245 33.584 55.2487 33.5856 55.3724 33.5888Z" fill="#D209B6" />
                    <path d="M55.8033 14.0096C74.2098 14.4363 88.9999 29.4909 89 48C89 66.7777 73.7777 82 55 82C50.0281 82 45.3057 80.9322 41.0488 79.0144L49.0553 61.1368C50.8679 61.9583 52.8804 62.416 55 62.416C62.9617 62.416 69.416 55.9617 69.416 48C69.4159 40.3463 63.4514 34.0862 55.9169 33.6132L55.8033 14.0096Z" fill="#D209B6" fillOpacity="0.5" />
                </svg>
            ),
            color: 'bg-pink-100 text-pink-600'
        },
        {
            name: 'Actividad',
            icon: (
                <svg width="110" height="87" viewBox="0 0 110 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 18C23 20.7614 20.7614 23 18 23C15.2386 23 13 20.7614 13 18C13 15.2386 15.2386 13 18 13C20.7614 13 23 15.2386 23 18Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M30 18.5C30 16.567 31.567 15 33.5 15H93.5C95.433 15 97 16.567 97 18.5C97 20.433 95.433 22 93.5 22H33.5C31.567 22 30 20.433 30 18.5Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M23 33C23 35.7614 20.7614 38 18 38C15.2386 38 13 35.7614 13 33C13 30.2386 15.2386 28 18 28C20.7614 28 23 30.2386 23 33Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M30 34.5C30 32.567 31.567 31 33.5 31H78.5C80.433 31 82 32.567 82 34.5C82 36.433 80.433 38 78.5 38H33.5C31.567 38 30 36.433 30 34.5Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M23 48C23 50.7614 20.7614 53 18 53C15.2386 53 13 50.7614 13 48C13 45.2386 15.2386 43 18 43C20.7614 43 23 45.2386 23 48Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M30 48.5C30 46.567 31.567 45 33.5 45H67.5C69.433 45 71 46.567 71 48.5C71 50.433 69.433 52 67.5 52H33.5C31.567 52 30 50.433 30 48.5Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M23 63C23 65.7614 20.7614 68 18 68C15.2386 68 13 65.7614 13 63C13 60.2386 15.2386 58 18 58C20.7614 58 23 60.2386 23 63Z" fill="#D209B6" fillOpacity="0.5" />
                    <path d="M30 63.5C30 61.567 31.567 60 33.5 60H86.5C88.433 60 90 61.567 90 63.5C90 65.433 88.433 67 86.5 67H33.5C31.567 67 30 65.433 30 63.5Z" fill="#D209B6" fillOpacity="0.5" />
                </svg>
            ),
            color: 'bg-pink-100 text-pink-600'
        },
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
                            <h2 className="text-[32px] font-bold text-[#1E1E1E] mt-12 mb-8 lg:mb-12 uppercase tracking-wide text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>SELECCIONAR MODO</h2>

                            {/* Cards Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12 w-full max-w-4xl place-items-center">
                                {cards.map((card) => (
                                    <button
                                        key={card.name}
                                        onClick={() => card.name === 'Red' && setViewMode('TREE')}
                                        className={`flex flex-col items-center justify-center p-4 lg:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${card.color} hover:scale-105 bg-opacity-30 w-[180px] h-[180px] cursor-pointer`}
                                        style={{ backgroundColor: '#FDEEF9' }}
                                    >
                                        <span className="font-bold text-gray-800 text-sm lg:text-lg mb-2">{card.name}</span>
                                        <div className="text-pink-600 transform scale-75 lg:scale-100">
                                            {card.icon}
                                        </div>
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
