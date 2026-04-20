/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
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
                }
            },
            boxShadow: {
                'recipe': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}

