/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'teal-dark': '#053937',
        'teal-medium': '#0b3b38',
        'rose-powder': '#F6D8DA',
        'cream': '#FAF6F3',
        'gold': '#D4AF37',
        'text-gray': '#6B6B6B',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
