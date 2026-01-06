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
          purple: '#9F00AD',
          magenta: '#D209B6',
          dark: '#5B21B6',
        },
        accent: {
          yellow: '#FCD34D',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(to bottom, #D209B6, #9F00AD)',
      },
    },
  },
  plugins: [],
}

