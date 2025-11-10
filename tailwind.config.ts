import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // This line is for the app router
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lime: {
          400: '#a3e635', // Example lime color
          500: '#84cc16',
        }
      },
      
      // --- CLEANED UP ANIMATION ---
      animation: {
        'aurora-flow': 'aurora-flow 40s linear infinite',
      },
      keyframes: {
        'aurora-flow': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      }
      // --- END OF ANIMATION ---
    },
  },
  plugins: [],
};
export default config;