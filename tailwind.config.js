/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pink-accent': '#EEBDC2',
      },
      fontFamily: {
        'veneer-two': ['Veneer Two', 'serif'],
      },
    },
  },
  plugins: [],
};
