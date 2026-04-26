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
        display: ['"Orbitron"', '"Rajdhani"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
        sans: ['"Rajdhani"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          900: '#03040a',
          800: '#070914',
          700: '#0a0d1c',
          600: '#101426',
          500: '#171c33',
        },
        neon: {
          cyan: '#00f0ff',
          magenta: '#ff2ec4',
          yellow: '#f9f871',
          lime: '#7cff6b',
          violet: '#b388ff',
          red: '#ff3a5c',
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 6px #00f0ff, 0 0 24px rgba(0, 240, 255, 0.55)',
        'neon-magenta': '0 0 6px #ff2ec4, 0 0 24px rgba(255, 46, 196, 0.55)',
        'neon-yellow': '0 0 6px #f9f871, 0 0 24px rgba(249, 248, 113, 0.45)',
        'neon-lime': '0 0 6px #7cff6b, 0 0 24px rgba(124, 255, 107, 0.45)',
        'neon-violet': '0 0 6px #b388ff, 0 0 24px rgba(179, 136, 255, 0.55)',
      },
      backgroundImage: {
        'grid-cyber':
          'linear-gradient(rgba(0,240,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.08) 1px, transparent 1px)',
        'noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
      },
      animation: {
        glitch: 'glitch 2.4s infinite linear alternate-reverse',
        'glitch-2': 'glitch2 3.2s infinite linear alternate-reverse',
        flicker: 'flicker 4s infinite',
        scan: 'scan 6s linear infinite',
        marquee: 'marquee 30s linear infinite',
        'pulse-neon': 'pulseNeon 2.4s ease-in-out infinite',
        'border-flow': 'borderFlow 4s linear infinite',
        blink: 'blink 1s step-end infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(-1px, -2px)' },
          '60%': { transform: 'translate(2px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' },
          '100%': { transform: 'translate(0)' },
        },
        glitch2: {
          '0%': { clipPath: 'inset(20% 0 60% 0)' },
          '25%': { clipPath: 'inset(70% 0 10% 0)' },
          '50%': { clipPath: 'inset(40% 0 40% 0)' },
          '75%': { clipPath: 'inset(10% 0 70% 0)' },
          '100%': { clipPath: 'inset(55% 0 25% 0)' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.4' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseNeon: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 6px currentColor)' },
          '50%': { opacity: '0.75', filter: 'drop-shadow(0 0 18px currentColor)' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
