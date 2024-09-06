import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#7c5dfa",
        lightPurple: "#9277ff",
        beige: "#1e2139",
        lightBeige: "#252945",
        lightestPurple: "#dfe3fa",
        strongPurple: "#888eb0",
        lighterPurple: "#7e88c3",
        darkBeige: "#0c0e16",
        errorRed: "#ec5757",
        lightRed: "rgb(255,151,151)",
        lightBg: "#f8f8f8",
        darkerBeige: "#141625",
      },
    },
  },
  plugins: [],
};
export default config;
