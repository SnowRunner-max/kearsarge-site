/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0b0b',
        panel: {
          DEFAULT: '#121212',
          2: '#171717'
        },
        ink: '#ececec',
        muted: '#c4c4c4',
        gold: {
          DEFAULT: '#d27d2d',
          2: '#b5651d'
        },
        line: 'rgba(210,125,45,.36)',
        danger: '#ff5c5c',
        ok: '#7bd67b',
        warn: '#ffb84d',
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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif']
      },
      maxWidth: {
        'site': '1100px'
      }
    }
  },
  plugins: []
};

