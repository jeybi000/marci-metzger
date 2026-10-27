/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: "#162b37",
        "ink-soft": "#44535a",
        paper: "#f7f5f1",
        surface: "#eeebe5",
        navy: "#0c2633",
        "blue-deep": "#173847",
        accent: "#76552e",
        "accent-dark": "#5f4223",
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["DM Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      fontSize: {
        "hero-h1": ["clamp(2.75rem, 2.25rem + 3.2vw, 5rem)", { lineHeight: "0.95", letterSpacing: "-0.025em", fontWeight: "500" }],
        "section-h2": ["clamp(2.25rem, 1.85rem + 1.8vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "500" }],
        "section-h3": ["clamp(1.625rem, 1.45rem + 0.8vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "500" }],
        "card-h": ["clamp(1.5rem, 1.35rem + 0.6vw, 1.75rem)", { lineHeight: "1.25", fontWeight: "500" }],
        "body-lg": ["clamp(1rem, 0.94rem + 0.28vw, 1.125rem)", { lineHeight: "1.6", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        nav: ["0.9375rem", { lineHeight: "1.4", fontWeight: "500" }],
        btn: ["clamp(0.9375rem, 0.9rem + 0.16vw, 1rem)", { lineHeight: "1.2", fontWeight: "600" }],
        label: ["0.875rem", { lineHeight: "1.4", fontWeight: "500" }],
        eyebrow: ["clamp(0.75rem, 0.72rem + 0.14vw, 0.8125rem)", { lineHeight: "1.4", letterSpacing: "0.16em", fontWeight: "600" }],
      },
    },
  },
  plugins: [],
};

