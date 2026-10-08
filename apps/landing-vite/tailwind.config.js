/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#001D4A',
        'secondary-blue': '#002D5F',
      },
    },
  },
  plugins: [],
};
