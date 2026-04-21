/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx,mdx}",
        "./components/**/*.{js,jsx,ts,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#10b981', // emerald-500
                    DEFAULT: '#059669', // emerald-600
                    dark: '#047857', // emerald-700
                },
                accent: {
                    light: '#f97316', // orange-500
                    DEFAULT: '#ea580c', // orange-600
                },
                surface: {
                    ground: '#f8fafc', // slate-50 
                    card: '#ffffff',
                    border: '#e2e8f0', // slate-200 
                },
                main: {
                    title: '#0f172a',  // slate-900
                    body: '#334155',   // slate-700
                    muted: '#64748b',  // slate-500
                },
                // Плоская структура цветов для компонента пищевой ценности
                'nutrition-primary': '#0FA894', // Основной акцент - бирюзовый для бордера и заголовка
                'nutrition-bg': '#FFFFFF', // Фон блока пищевой ценности
                'nutrition-value': '#1F2937', // Цвет для цифр (310, 7g, 52g, 8g)
                'nutrition-label': '#6B7280', // Цвет для подписей (КАЛОРИИ, ЖИРЫ, УГЛЕВОДЫ, БЕЛКИ)
            },
            boxShadow: {
                'recipe': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'nutrition': '0 4px 6px rgba(0, 0, 0, 0.1)', // Мягкая тень блока пищевой ценности
            },
            borderRadius: {
                'nutrition': '16px', // Скругление углов блока пищевой ценности
            }
        },
    },
    plugins: [],
}

