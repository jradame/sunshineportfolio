/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Dark mode base
        night: "#0B0B0F",
        ink: "#111118",
        smoke: "#1B1B24",

        // Paper surface (cards)
        paper: "#F2E6CF",

        // Traditional pops
        primary: "#8B1E2D", // oxblood
        secondary: "#1F3A5F", // navy
        accent: "#C9A227", // aged gold
        teal: "#1F7A7A", // teal pop

        // Text
        chalk: "#F7F3EA",
        muted: "#B9B4AA",
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
