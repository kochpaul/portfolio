// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
          gradientStart: 'rgb(var(--color-primary-gradient-start) / <alpha-value>)',
          light: '#a855f7',
          dark: '#7e22ce',
        },
      },
    },
  },
  plugins: [],
}
