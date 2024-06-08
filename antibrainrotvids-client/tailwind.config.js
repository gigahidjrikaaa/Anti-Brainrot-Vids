/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1e3a8a',
        'futuristic-blue': '#2563eb',
        'background-dark': '#0f172a',
        'background-light': '#1e293b',
      },
    },
  },
  plugins: [],
}
