'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DesktopNav from './_navigation/DesktopNav';
import MobileNav from './_navigation/MobileNav';
import Logo from './Logo';

const navigationItems = [
    {
        label: 'Спорт',
        items: [
            { label: 'Тренировки', href: '#' },
            { label: 'Активности', href: '#' },
            { label: 'Прогресс', href: '#' },
        ],
    },
    {
        label: 'Диета',
        items: [
            { label: 'Рецепты', href: '/recipes' },
            { label: 'Планы питания', href: '#' },
            { label: 'Советы по питанию', href: '/nutrition-tips' },
        ],
    },
    {
        label: 'Красота',
        items: [
            { label: 'Уход за кожей', href: '#' },
            { label: 'Уход за волосами', href: '#' },
            { label: 'Советы и трюки', href: '#' },
        ],
    },
];

export default function Header() {
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        // Check initial viewport
        const checkViewport = () => {
            setIsDesktop(window.innerWidth >= 768); // md breakpoint = 768px
        };

        checkViewport();

        // Listen for resize events
        const handleResize = () => {
            checkViewport();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="sticky top-0 z-40 w-full bg-white border-b-4 border-teal-500 shadow-recipe">
            <div className="max-w-6xl mx-auto">
                {/* Main Header Row */}
                <div className="flex items-center justify-between px-4 py-4 md:px-6">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 group"
                        aria-label="Home"
                    >
                        <Logo />
                        <span className="text-xl font-bold text-main/title hidden sm:inline group-hover:text-primary transition-colors duration-150">
                            LevelUp
                        </span>
                    </Link>

                    {/* Navigation - Desktop or Mobile */}
                    {isDesktop ? (
                        <DesktopNav items={navigationItems} />
                    ) : (
                        <MobileNav items={navigationItems} />
                    )}
                </div>
            </div>
        </header>
    );
}
