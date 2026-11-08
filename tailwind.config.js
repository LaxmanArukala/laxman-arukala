/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07070a',
          900: '#0c0c11',
          800: '#121218',
          700: '#1a1a22',
        },
        accent: {
          DEFAULT: '#4f8cff',
          soft: '#7aa7ff',
          violet: '#8b7bff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'sans-serif'],
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['ui-monospace', '"SFMono-Regular"', 'Menlo', 'Consolas', 'monospace'],      },
      letterSpacing: {
        tightest: '-0.055em',
      },
    },
  },
  plugins: [],
};
