import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
          400: '#a3e635',
          500: '#84cc16',
        }
      },
      // Aurora animation configuration (faster + stronger glow)
      animation: {
        'aurora-flow': 'aurora-flow 3s ease-in-out infinite',
        'aurora-2': 'aurora-2 2s ease-in-out infinite',
        'aurora-3': 'aurora-3 3s ease-in-out infinite',
        'blink': 'blink 1s steps(1, end) infinite',
      },
      keyframes: {
        'aurora-flow': {
          '0%, 100%': { 
            transform: 'translate(0%, 0%) scale(1)',
            opacity: '1'
          },
          '33%': { 
            transform: 'translate(30%, -20%) scale(1.1)',
            opacity: '0.9'
          },
          '66%': { 
            transform: 'translate(-20%, 30%) scale(0.9)',
            opacity: '0.95'
          },
        },
        'aurora-2': {
          '0%, 100%': { 
            transform: 'translate(0%, 0%) scale(1)',
            opacity: '1'
          },
          '50%': { 
            transform: 'translate(-30%, 20%) scale(1.2)',
            opacity: '0.85'
          },
        },
        'aurora-3': {
          '0%, 100%': { 
            transform: 'translate(0%, 0%) scale(1)',
            opacity: '1'
          },
          '50%': { 
            transform: 'translate(20%, -30%) scale(1.15)',
            opacity: '0.9'
          },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
