/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0e1117",
        panel: "#121924",
        accent: "#ff4d4d",
        soft: "#8a93a8",
        border: "#22304f",
      },
    },
  },
  plugins: [],
};
