import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#001C2A",
        petroleum: "#036E97",
        cyan: "#04A8C6",
        yellow: "#F0BE5B",
        soft: "#F5F5F5",
      },
      fontFamily: {
        sora: ["Sora Variable", "Sora", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
