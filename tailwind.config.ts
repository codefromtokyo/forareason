import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        delft: "#1D4BA8",
        travel: "#0F766E",
        road: "#15803D",
        visa: "#4338CA",
        nomad: "#B45309",
        ink: "#141F2E",
        surface: "#FFFFFF",
        paper: "#F1F4F9",
      },
      fontFamily: {
        ui: ["Figtree", "system-ui", "sans-serif"],
        read: ["Literata", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
