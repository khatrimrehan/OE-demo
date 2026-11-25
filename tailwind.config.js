/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Square design: every rounded-* utility resolves to 0
    borderRadius: { none: '0', sm: '0', DEFAULT: '0', md: '0', lg: '0', xl: '0', '2xl': '0', '3xl': '0', full: '0' },
    extend: {
      fontSize: {
        xs: ['0.875rem', { lineHeight: '1.35rem' }],   // was 12px -> 14px
        sm: ['1rem', { lineHeight: '1.5rem' }],        // was 14px -> 16px
      },
      fontFamily: {
        // body / UI text: Magda Clean Mono  (swap with 'Bell Gothic Std' to change)
        sans: ['"Magda Clean Mono"', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
        // headings / display: Bell Gothic Std
        serif: ['"Bell Gothic Std"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      colors: {
        page: 'rgb(var(--c-page) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        onink: 'rgb(var(--c-onink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
      },
      maxWidth: { page: '1140px' },
    },
  },
  plugins: [],
};
