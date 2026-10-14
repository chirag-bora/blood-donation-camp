import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blood: {
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6868',
          500: '#f83b3b',
          600: '#e51d1d',
          700: '#d71920',
          800: '#a80000',
          900: '#8a0000',
          950: '#4c0000',
        },
      },
      fontFamily: {
        sans: ['Noto Sans', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #fff 0%, #fff1f1 50%, #ffe1e1 100%)',
        'red-gradient': 'linear-gradient(135deg, #d71920 0%, #a80000 100%)',
        'card-gradient': 'linear-gradient(135deg, #ffffff 0%, #fff8f8 100%)',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(215, 25, 32, 0.1), 0 2px 4px -1px rgba(215, 25, 32, 0.06)',
        'card-hover': '0 10px 25px -3px rgba(215, 25, 32, 0.2), 0 4px 6px -2px rgba(215, 25, 32, 0.1)',
        'button': '0 4px 15px rgba(215, 25, 32, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
