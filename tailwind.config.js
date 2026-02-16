/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Base
        ink: "#000000",

        // Paper background
        paper: "#F5E7D3",

        // Traditional palette
        crimson: "#DC143C",
        forest: "#228B22",
        gold: "#FFD700",
        rope: "#8B4513",
        pastel: "#4EC64E",
        palm: "#0E390E",
      },
      boxShadow: {
        flash: "6px 6px 0 #000000",
        flashSoft: "10px 10px 0 rgba(0,0,0,0.25)",
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
