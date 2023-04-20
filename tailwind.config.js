/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    // prefix: "daisy",
    themes: [
      {
        mytheme: {
          primary: "#70ece4",
          secondary: "#70d9d2",
          accent: "#ec8c6f",
          neutral: "#3b4949",
          "neutral-content": "#f5f5f4",
          "base-100": "#2A303C",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  // daisyui: {
  //   styled: true,
  //   themes: true,
  //   base: true,
  // utils: true,
  // logs: true,
  // rtl: false,
  // prefix: "",
  // darkTheme: "dark",
  // },
};
