module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': require('cssnext'),
    'autoprefixer': require('autoprefixer'),
    'cssnano': {}
  }
};
