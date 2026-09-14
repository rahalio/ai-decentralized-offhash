/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#E8EEF4',
          950: '#0B1118',
        },
        steel: {
          DEFAULT: '#7A90A6',
          900: '#141C28',
          700: '#2C3A4C',
        },
        assay: {
          DEFAULT: '#4DB6A0',
          dim: '#1F6B5C',
        },
        amber: '#D9A441',
        coral: '#E0574F',
        brand: '#A8D5C8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
      },
    },
  },
  plugins: [],
};
