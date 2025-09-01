/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        tundra: {
          50: '#f6fafc',
          100: '#e7f3f8',
          200: '#c9e3ee',
          300: '#9ecade',
          400: '#6ea9c9',
          500: '#4a8db2',
          600: '#3a7397',
          700: '#315e7d',
          800: '#2d4f68',
          900: '#274257'
        }
      }
    }
  },
  plugins: []
};

