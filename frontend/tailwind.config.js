/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customPink: "#FF5733", // Add your custom hex code
        customPurple: "#C68FE6",
        customPurple1: "#8967B3",
        customBlue: "#6C48C5",
        customBlue1: "#4E31AA",
        customTeal: "#79D7BE",
        customTeal2: "#4DA1A9",
        customTeal3: "#227B94",
        customGold: "#FFB200",
        customGold1: "#FAB12F",
        customGold2: "#FA812F",
      },
    },
  },
  plugins: [],
};
