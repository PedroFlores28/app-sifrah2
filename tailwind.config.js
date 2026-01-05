/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#7C3AED',
          magenta: '#EC4899',
          dark: '#5B21B6',
        },
        accent: {
          yellow: '#FCD34D',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(to bottom, #EC4899, #7C3AED)',
      },
    },
  },
  plugins: [],
}

