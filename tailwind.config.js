module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "faint-peach": "#fff4f0",
        "at-faint-orange": "#fe6945",
        "at-light-orange": "#d85a3b",
        "at-orange": "#a4442d",
        "light-grey": "#f7f7f7",
        "dark-grey": "#3d4250",
        "gold": "#d8c93b"
      },
    },
    fontFamily: {
      Poppins: ["Poppins, sans-serif"],
    },
    flex: {
      1: "1 1 0%",
      2: "2 2 0%",
    },
    container: {
      center: true,
      screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
