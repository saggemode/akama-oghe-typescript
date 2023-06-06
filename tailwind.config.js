/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          blue_light: "#232f3e",
          blue_dark: "#131921",
          orange: "#febd69",
        },
      },
    },
  },
  //plugins: [require("daisyui")],
};
