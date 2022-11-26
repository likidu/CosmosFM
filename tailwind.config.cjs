const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{svelte,js,ts}'],
  theme: {
    extend: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Open Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
      fontSize: {
        sm: '1.2rem',
        base: '1.4rem',
      },
      fontWeight: {
        bold: 'var(--bold-font-weight)',
      },
      colors: {
        primary: 'var(--text-color)',
        secondary: 'var(--secondary-text-color)',
        divider: 'var(--divider-color)',
        accent: 'var(--accent-color)',
        focus: 'var(--focus-color)',
        card: 'var(--card-color)',
        'card-border': 'var(--card-border-color)',
      },
    },
    variants: {},
    plugins: [lineClamp],
  },
};
