/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F5E7D3",
        ink: "#111111",
        red: "#C73B2F",
        mustard: "#C8A100",
        teal: "#1F8A8A",
      },
      boxShadow: {
        flash: "6px 6px 0 #111111",
        flashSoft: "10px 10px 0 rgba(17,17,17,0.25)",
      },
      borderRadius: {
        flash: "14px",
      },
      fontFamily: {
        display: ["ui-serif", "Georgia", "serif"],
        body: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
