/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          "at-light-orange": "#ff911d",
          "at-orange": "#f36e1c",
          "light-grey": "#f1f1f1",
        },
      },
      fontFamily: {
        Poppins: ["Poppins, sans-serif"],
      },
      flex: {
        "1": "1 1 0%",
        "2": "2 2 0%",
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