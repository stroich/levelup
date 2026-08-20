'use client';

import { useState } from 'react';

interface NavItem {
    label: string;
    icon?: string;
    items: Array<{ label: string; href: string }>;
}

interface MobileNavProps {
    items: NavItem[];
}

export default function MobileNav({ items }: MobileNavProps) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const toggleDropdown = (label: string) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    const handleDropdownItemClick = () => {
        setOpenDropdown(null);
    };

    return (
        <div className="flex flex-col gap-1 py-2 px-4 bg-white border-t border-surface-border">
            {items.map((item) => (
                <div key={item.label} className="relative">
                    <button
                        onClick={() => toggleDropdown(item.label)}
                        className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-main-body hover:bg-surface-ground hover:text-primary transition-colors duration-150 flex justify-between items-center border-b-2 border-transparent hover:border-primary"
                        aria-expanded={openDropdown === item.label}
                        aria-haspopup="menu"
                    >
                        <span>{item.label}</span>
                        <span className="text-xs">
                            {openDropdown === item.label ? '▼' : '▶'}
                        </span>
                    </button>
                    {openDropdown === item.label && (
                        <div
                            className="relative mt-1 bg-surface-ground rounded-md overflow-hidden"
                            onClick={handleDropdownItemClick}
                        >
                            <ul className="py-1">
                                {item.items.map((subitem, index) => (
                                    <li key={index}>
                                        <a
                                            href={subitem.href}
                                            className="block px-4 py-2 text-xs text-main-body hover:bg-white hover:text-primary transition-colors duration-150"
                                        >
                                            {subitem.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
