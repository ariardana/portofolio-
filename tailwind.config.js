/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#0a0b0f',
          surface: '#10131a',
          elevated: '#161a23',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.14)',
        },
        accent: {
          DEFAULT: '#7dd3fc',
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        glow: '0 0 0 1px rgba(125, 211, 252, 0.15), 0 8px 24px -8px rgba(125, 211, 252, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        blink: 'blink 1.1s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
