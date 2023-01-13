module.exports = {
  purge: {
    enabled: true,
    content: ["./public/**/*.html", "./src/**/*.vue"]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "faint-peach": "#fff4f0",
        "at-faint-orange": "#fe6945",
        "at-light-orange": "#d85a3b",
        "at-orange": "#a4442d",
        "light-grey": "#f7f7f7",
        "light-grey2": "#e4ffff",
        "med-grey": "#4b5153",
        "dark-grey": "#292c2d",
        "gold": "#ffcc41",
        "light-gold": "#fff0c6"

      },
    },
    fontFamily: {
      Exo2: ["Exo-2, sans-serif"],
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
