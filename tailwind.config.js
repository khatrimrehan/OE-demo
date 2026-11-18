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
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
      },
      colors: {
        ink: '#111111',
        muted: '#6f6f6f',
        surface: '#f6f6f6',
        line: '#e8e8e8',
      },
      maxWidth: { page: '1140px' },
    },
  },
  plugins: [],
};
