'use client';

interface DropdownItem {
    label: string;
    href: string;
}

interface DropdownMenuProps {
    items: DropdownItem[];
    isOpen: boolean;
    isMobile?: boolean;
}

export default function DropdownMenu({
    items,
    isOpen,
    isMobile = false,
}: DropdownMenuProps) {
    if (!isOpen) return null;

    return (
        <div
            className={`absolute top-full left-0 z-50 mt-1 bg-white border border-teal-100 border-surface-border rounded-lg shadow-recipe transition-opacity duration-200 ${isMobile ? 'w-full' : 'w-56'
                }`}
            role="menu"
            aria-orientation="vertical"
        >
            <ul className="py-2">
                {items.map((item, index) => (
                    <li key={index} role="none">
                        <a
                            href={item.href}
                            className={`block px-4 py-2 text-main-body hover:bg-teal-600 hover:text-white transition-colors duration-150 ${isMobile ? 'text-sm' : 'text-sm'
                                }`}
                            role="menuitem"
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
