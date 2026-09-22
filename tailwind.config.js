/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        salon: {
          50: '#FFF0F4',
          100: '#FFE3E9',
          200: '#FFCAD6',
          300: '#FFA4B8',
          400: '#F77292',
          500: '#E85D75', // Primary Salon Rose
          600: '#D23F59',
          700: '#B32C44',
          800: '#94263A',
          900: '#7D2333',
        },
        charcoal: {
          950: '#0C0E12',
          900: '#12151A',
          850: '#161920',
          800: '#1B2028',
          700: '#252C38',
          600: '#343E4E',
          500: '#4A5568',
        },
        pastel: {
          rose: {
            bg: '#FFF0F3',
            border: '#FCD8DF',
            text: '#D43859',
          },
          mint: {
            bg: '#F0FDF4',
            border: '#DCFCE7',
            text: '#16A34A',
          },
          violet: {
            bg: '#F5F3FF',
            border: '#EDE9FE',
            text: '#7C3AED',
          },
          sky: {
            bg: '#F0F9FF',
            border: '#E0F2FE',
            text: '#0284C7',
          },
          amber: {
            bg: '#FFFBEB',
            border: '#FEF3C7',
            text: '#D97706',
          },
          emerald: {
            bg: '#ECFDF5',
            border: '#D1FAE5',
            text: '#059669',
          },
          coral: {
            bg: '#FFF1F2',
            border: '#FFE4E6',
            text: '#E11D48',
          },
          indigo: {
            bg: '#EEF2FF',
            border: '#E0E7FF',
            text: '#4F46E5',
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 4px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'soft': '0 4px 12px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'soft-md': '0 8px 24px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 16px 36px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.04)',
        'glow-pink': '0 8px 25px -4px rgba(232, 93, 117, 0.25)',
      }
    },
  },
  plugins: [],
}
