import Link from 'next/link';
import DesktopNav from './_navigation/DesktopNav';
import MobileNav from './_navigation/MobileNav';
import Logo from './Logo';

const navigationItems = [
    {
        label: 'Сегодня',
        items: [
            { label: 'План на день', href: '/#menu' },
            { label: 'Тренировки', href: '/#workouts' },
            { label: 'Красота', href: '/#beauty' },
        ],
    },
    {
        label: 'Питание',
        items: [
            { label: 'Меню на сегодня', href: '/#menu' },
            { label: 'Советы по питанию', href: '/nutrition-tips' },
            { label: 'Рецепты', href: '/#menu' },
        ],
    },
    {
        label: 'Забота о себе',
        items: [
            { label: 'Красота', href: '/#beauty' },
            { label: 'Распорядок дня', href: '/#beauty' },
            { label: 'Советы и трюки', href: '/nutrition-tips' },
        ],
    },
];

export default function Header() {
    return (
        <header className="sticky top-0 z-40 w-full bg-white border-b-4 border-teal-500 shadow-recipe">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between px-4 py-4 md:px-6">
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

                    <div className="hidden md:flex">
                        <DesktopNav items={navigationItems} />
                    </div>
                </div>

                <div className="md:hidden">
                    <MobileNav items={navigationItems} />
                </div>
            </div>
        </header>
    );
}
