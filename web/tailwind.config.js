/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        app: "#f0f0f0",
        card: "#fafafa",
        brand: "rgb(206, 25, 60)",
        brandBg: "#f5f7fa",
        brandCard: "#ffffff",
        navy: "#1e3a5f",
        navyMuted: "#4a5568",
        navyAccent: "#2c5282",
        navyBorder: "#001f3f",
        textPrimary: "#333333",
        textMuted: "rgba(0, 0, 0, 0.55)",
        footer: "rgba(0, 0, 0, 0.22)",
        divider: "rgba(0, 0, 0, 0.12)",
        lineDivider: "rgba(0, 0, 0, 0.12)",
      },
      screens: {
        tablet: "600px",
        laptop: "1024px",
        desktop: "1280px",
        wide: "1536px",
      },
      boxShadow: {
        card: "0 4px 14px rgba(0, 0, 0, 0.08)",
        button: "0 2px 6px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
