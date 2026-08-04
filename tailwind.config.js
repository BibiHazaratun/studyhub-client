/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#001b2a',
        card: '#07243a',
        cardHi: '#0d3252',
        green: {
          DEFAULT: '#16a34a',
          dim: '#15803d',
          hi: '#22c55e',
        },
        blue: '#1e3a8a',
        gold: {
          DEFAULT: '#f4c542',
          dim: '#d4a017',
        },
        text: '#ffffff',
        textSec: '#cbd5e1',
        textMuted: '#64748b',
        borderSub: 'rgba(255, 255, 255, 0.06)',
        borderGreen: 'rgba(22, 163, 74, 0.18)',
        borderGreenHi: 'rgba(22, 163, 74, 0.45)',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', '"Hind Siliguri"', 'sans-serif'],
        body: ['"Inter"', '"Hind Siliguri"', 'sans-serif'],
      },
      borderRadius: {
        sm: '10px',
        DEFAULT: '14px',
        lg: '20px',
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: '200% center' },
          to: { backgroundPosition: '-200% center' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        cardIn: {
          from: { opacity: 0, transform: 'translateY(16px) scale(0.97)' },
          to: { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        ringPulse: {
          '0%': { transform: 'scale(1)', opacity: 0.8 },
          '100%': { transform: 'scale(2.2)', opacity: 0 },
        },
        orbBreathe: {
          from: { transform: 'scale(1)', opacity: 0.7 },
          to: { transform: 'scale(1.15)', opacity: 1 },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        fadeUp: 'fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) forwards',
        cardIn: 'cardIn 0.5s cubic-bezier(0.4,0,0.2,1) forwards',
        ringPulse: 'ringPulse 2s ease-out infinite',
        orbBreathe: 'orbBreathe 9s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
