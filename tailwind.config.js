// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#3498db',
          700: '#2980b9',
        },
        purple: {
          500: '#8e44ad',
          700: '#732d91',
        },
      },
    },
  },
  variants: {},
  plugins: [],
};