/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    fontSize: {
      xs: ["12px", { lineHeight: "24px", letterSpacing: "-0.03em" }],
      sm: ["14px", { lineHeight: "28px", letterSpacing: "-0.03em" }],
      md: ["16px", { lineHeight: "28px", letterSpacing: "-0.03em" }],
      lg: ["18px", { lineHeight: "28px", letterSpacing: "-0.03em" }],
      xl: ["24px", { lineHeight: "36px", letterSpacing: "-0.03em" }],
      "2xl": ["36px", { lineHeight: "48px", letterSpacing: "-0.032em" }],
      "3xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.032em" }],
      "4xl": ["56px", { lineHeight: "64px", letterSpacing: "-0.032em" }],
      "5xl": ["80px", { lineHeight: "80px", letterSpacing: "-0.032em" }],
    },
    colors: {
      primary: {
        900: "#1a73e8",
        500: "#4281d4",
      },
      blue: "#1a73e8",
      red: "red",
      white: "#fff",
      black: "#000",
      "cool-white": "#ecebff",
      gradient: {
        start: "#f9ce34",
        mid: "#ee2a7b",
        end: "#6228d7",
      },
    },
    extend: {
      screens: {
        sm: "620px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
    },
  },
  plugins: [],
};
