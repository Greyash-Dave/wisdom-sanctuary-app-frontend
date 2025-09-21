// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#f7f3e9',
        sepia: '#8b7355',
        gold: '#d4af37',
        sage: '#9caf88',
        crimson: '#8b2635'
      },
      fontFamily: {
        serif: ['Crimson Text', 'serif'],
        display: ['Cinzel', 'serif']
      }
    },
  },
  plugins: [],
}