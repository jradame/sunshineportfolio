/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Dark base
        night: "#0B0B0F",
        ink: "#12121A",

        // Text
        chalk: "#F7F3EA",

        // Pop colors (traditional-ish)
        primary: "#8B1E2D", // oxblood red
        accent: "#C9A227",  // aged gold (optional)
        teal: "#1F7A7A",    // teal pop (optional)
      },
      borderRadius: {
        flash: "14px",
      },
      fontFamily: {
        display: ["Rye", "ui-serif", "Georgia", "serif"],
        body: ["Space Grotesque", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0,0,0,.45)",
      },
    },
  },
  plugins: [],
};
