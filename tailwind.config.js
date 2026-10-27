/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: "#172a35",
        paper: "#f4f7f7",
        "pahrump-blue": "#264c5d",
        "sky-blue": "#17668a",
      },
    },
  },
  plugins: [],
};
