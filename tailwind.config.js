/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary:    '#0A0A0A',
        accent:     '#C9A84C',
        'accent-light': '#E8D5A3',
        bg:         '#FAFAF8',
        'bg-dark':  '#111111',
        'bg-mid':   '#F2F0EB',
        text:       '#1A1A1A',
        'text-mid': '#555555',
        'text-light':'#888888',
        border:     '#E0DDD7',
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
