/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#EDE6D6',
        paperDark: '#E1D8C4',
        ink: '#1F2A24',
        inkSoft: '#3A4A3F',
        maroon: '#7A2E2E',
        maroonDark: '#5E2222',
        sage: '#8FA98C',
        sageDark: '#6E8C6B',
        manila: '#D9B382',
      },
      fontFamily: {
        display: ['Lora', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'card-texture': "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(31,42,36,0.04) 28px)",
      },
    },
  },
  plugins: [],
}
