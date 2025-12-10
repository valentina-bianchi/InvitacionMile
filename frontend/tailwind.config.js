/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: {
          50: '#fef9f5',
          100: '#fdf3eb',
          200: '#fae6d1',
          300: '#f7d9b7',
          400: '#f4cc9d',
          500: '#f1bf83',
          600: '#eeb269',
          700: '#eba54f',
          800: '#e89835',
          900: '#d8851a',
          DEFAULT: '#f7e7ce', // rgb(247, 231, 206)
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}