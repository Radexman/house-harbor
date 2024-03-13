// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['winter', 'dark'],
  },
};
