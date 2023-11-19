/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: "#405CE8",
          500: "#425EF1",
          400: "#687EF4",
          300: "#8E9EF7",
          200: "#B3BFF9",
          100: "#D9DFFC",
        },
        secondary: {
          600: "#15CFA3",
          500: "#14D7A8",
          400: "#43DFB9",
          300: "#72E7CB",
          200: "#A1EFDC",
          100: "#D0F7EE",
        },
      },
    },
  },
  plugins: [],
};
