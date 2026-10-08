/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFB300', // amber
          dark: '#FF8F00',
        },
        secondary: {
          DEFAULT: '#00E5FF', // cyan
          dark: '#00B8D4',
        },
        accent: '#39FF14', // neon green
        critical: '#FF3B30', // subtle red
        background: '#020204',
        surface: '#0a0a0f',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 10px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [],
};
