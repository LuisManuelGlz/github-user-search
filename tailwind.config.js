module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    boxShadow: {
      blue: '0 0 #0000, 0 0 #0000, 0 20px 25px -5px rgb(59 130 246/0.5),0 8px 10px -6px rgb(59 130 246/0.5)',
    },
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
