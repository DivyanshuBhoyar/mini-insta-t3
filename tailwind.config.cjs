/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#dbd120",
          secondary: "#aa76e2",
          accent: "#d3500a",
          neutral: "#2B2E3B",
          "base-100": "#2c2d3e",
          info: "#1882EC",
          success: "#39D585",
          warning: "#F89225",
          error: "#FC5F81",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
