'use client';

import { useState, useRef, useEffect } from 'react';
import DropdownMenu from './DropdownMenu';

interface NavItem {
    label: string;
    icon?: string;
    items: Array<{ label: string; href: string }>;
}

interface DesktopNavProps {
    items: NavItem[];
}

export default function DesktopNav({ items }: DesktopNavProps) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const navRef = useRef<HTMLElement>(null);

    const handleClick = (label: string) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLButtonElement>,
        label: string
    ) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(label);
        } else if (e.key === 'Escape') {
            setOpenDropdown(null);
        }
    };

    return (
        <nav className="flex items-center gap-8" ref={navRef}>
            {items.map((item) => (
                <div
                    key={item.label}
                    className="relative"
                >
                    <button
                        onClick={() => handleClick(item.label)}
                        onKeyDown={(e) => handleKeyDown(e, item.label)}
                        className="px-3 py-2 text-sm font-medium text-main-body hover:text-primary transition-colors duration-150 relative group border-b-2 border-transparent hover:border-primary"
                        aria-expanded={openDropdown === item.label}
                        aria-haspopup="menu"
                    >
                        {item.label}
                        <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                    </button>
                    <div className="absolute left-0">
                        <DropdownMenu
                            items={item.items}
                            isOpen={openDropdown === item.label}
                            isMobile={false}
                        />
                    </div>
                </div>
            ))}
        </nav>
    );
}
