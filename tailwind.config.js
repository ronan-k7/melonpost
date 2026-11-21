/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#141b26",
        green: "#1a3a5c",
        "green-2": "#2b5580",
        "green-soft": "#e2e8f0",
        paper: "#faf8f2",
        "paper-deep": "#f1ecdf",
        cream: "#fffefb",
        line: "#b8b3a8",
        "line-light": "#ddd8cd",
        muted: "#68675f",
        red: "#8c3328",
        gold: "#c6a66a",
        "gold-light": "#e6d8b8",
        positive: "#33765b",
        negative: "#9b4136",
      },
      fontFamily: {
        serif: ["Georgia", '"Times New Roman"', "Times", "serif"],
        sans: ["Arial", "Helvetica", "sans-serif"],
        masthead: ["var(--font-masthead)", "\"Old English Text MT\"", "Georgia", "serif"],
      },
      boxShadow: {
        editorial: "0 18px 45px rgba(26, 37, 31, 0.12)",
      },
    },
  },
  plugins: [],
};
