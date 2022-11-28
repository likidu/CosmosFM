const dev = process.env.NODE_ENV === 'development';

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(dev && {
      cssnano: {
        preset: 'default',
      },
    }),
  },
};
