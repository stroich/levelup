/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './app/**/*.{js,jsx,ts,tsx,mdx}',
        './components/**/*.{js,jsx,ts,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#10b981',
                    DEFAULT: '#059669',
                    dark: '#047857',
                },
                accent: {
                    light: '#f97316',
                    DEFAULT: '#ea580c',
                },
                surface: {
                    ground: '#f8fafc',
                    card: '#ffffff',
                    border: '#e2e8f0',
                },
                main: {
                    title: '#0f172a',
                    body: '#334155',
                    muted: '#64748b',
                },
                nutrition: {
                    primary: 'rgb(var(--color-teal-500) / <alpha-value>)',
                    bg: '#ffffff',
                    value: '#1f2937',
                    label: '#6b7280',
                },
            },
            boxShadow: {
                recipe: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                nutrition: '0 4px 6px rgba(0, 0, 0, 0.1)',
            },
            borderRadius: {
                nutrition: '16px',
            },
        },
    },
}

