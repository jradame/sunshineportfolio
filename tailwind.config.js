// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Option A — Vintage Flash
        paper: "#F3E6CF",      // warm aged paper
        ink: "#111111",        // softer than pure black
        primary: "#8B1E2D",    // oxblood
        secondary: "#1F3A5F",  // navy
        accent: "#C9A227",     // aged gold
      },
      boxShadow: {
        flash: "6px 6px 0 #111111",
        flashSoft: "10px 10px 0 rgba(17,17,17,0.25)",
      },
      borderRadius: {
        flash: "14px",
      },
      fontFamily: {
        display: ["Rye", "ui-serif", "Georgia", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
