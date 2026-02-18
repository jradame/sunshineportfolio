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

        // Text
        chalk: "#F7F3EA",
        muted: "#B9B4AA",

        // Traditional pops (for buttons / accents)
        primary: "#8B1E2D",   // oxblood
        secondary: "#1F3A5F", // navy
        accent: "#C9A227",    // aged gold
        teal: "#1F7A7A",      // teal pop
      },

      borderRadius: {
        flash: "14px",
      },

      boxShadow: {
        soft: "0 18px 50px rgba(0,0,0,0.45)",
      },

      fontFamily: {
        // Your local OTF is used by @font-face in index.css
        display: ["TraditionalTattoo", "Rye", "serif"],
        body: ["Space Grotesk", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
