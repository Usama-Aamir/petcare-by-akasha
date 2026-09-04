import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: "#A8C9B8",
          deep: "#33574A",
          light: "#7FAF95",
        },
        cream: {
          DEFAULT: "#F5F1E4",
          alt: "#EDEADF",
        },
        navy: "#1E2A3B",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
