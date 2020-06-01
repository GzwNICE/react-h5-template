module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-preset-env': {},
    'postcss-plugin-px2rem': {
      rootValue: 100,
      selectorBlackList: [/^html$/, /^body$/],
      exclude: /(node_module)/,
      mediaQuery: false,
      minPixelValue: 2,
    },
    cssnano: {
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false,
    },
  },
};
