const colors = require("tailwindcss/colors");

const customColors = {
  transparent: "transparent",
  bg: "#232323",
  fg: "#fff",
  accent: "#C049FF",
  dark: "#131415",
};

module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // 'media' or 'class'
  theme: {
    fontFamily: {
      sans: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
    },
    colors: {
      ...colors,
      ...customColors,
      white: colors.white,
      black: colors.black,
    },
  },
  variants: {
    extend: {},
  },
};
