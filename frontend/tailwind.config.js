/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    bg: '#0B0F14',       // Dark Gray
                    card: '#111827',     // Slate
                    primary: '#F97316',  // Orange
                    accent: '#FDBA74',   // Light Orange
                    text: '#E5E7EB',     // Light Gray
                    muted: '#9CA3AF',    // Muted
                    border: '#1F2937',   // Border
                    warning: '#F59E0B',  // Amber

                }
            }
        },
    },
    plugins: [],
}
