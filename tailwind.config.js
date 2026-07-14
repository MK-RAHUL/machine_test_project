/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0A192F',
        deepblue: '#002966',
        amber: '#E88F00',
        cream: '#F8E9D2',
        ink: '#171717',
        bg: '#F7F7F7',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['"PT Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}
