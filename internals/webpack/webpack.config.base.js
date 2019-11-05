const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FirendlyErrorePlugin = require('friendly-errors-webpack-plugin');

const appSrc = path.join(process.cwd(), 'src');

const isEslint = process.env.ESLINT == 'true';

module.exports = options => {
  const isProduction = options.mode === 'production';
  const base = {
    mode: options.mode,
    entry: options.entry,
    output: Object.assign(
      {
        // Compile into js/build.js
        path: path.join(process.cwd(), 'dist'),
        publicPath: '/',
      },
      options.output
    ), // Merge with env dependent settings
    optimization: options.optimization,
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: options.babelQuery,
          },
        },
        {
          // Preprocess our own .css files
          // This is the place to add your own loaders (e.g. sass/less etc.)
          // for a list of loaders, see https://webpack.js.org/loaders/#styling
          test: /\.(scss|css)$/,
          include: /node_modules/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(scss|css)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader',
              options: {
                hmr: false,
              },
            },
            { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.less$/,
          include: /node_modules/,
          use: [
            {
              loader: 'style-loader',
              options: {
                hmr: false,
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: isProduction ? undefined : '[local]--[hash:base64:5]',
              },
            },
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          use: 'file-loader',
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                // Inline files smaller than 10 kB
                limit: 10 * 1024,
                noquotes: true,
              },
            },
          ],
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                // Inline files smaller than 10 kB
                limit: 10 * 1024,
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.(mp4|webm)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        },
      ],
    },
    plugins: options.plugins.concat([
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
      }),
      new ProgressBarPlugin(),
      new FirendlyErrorePlugin(),
    ]),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@': path.join(process.cwd(), 'src'),
        'react-dom': '@hot-loader/react-dom',
      },
    },
    devtool: options.devtool,
    target: 'web',
    performance: options.performance || {},
  };

  if (isEslint) {
    base.module.rules.unshift({
      test: /\.(ts|js)x?$/,
      enforce: 'pre',
      use: [
        {
          loader: require.resolve('eslint-loader'),
        },
      ],
      include: appSrc,
    });
  }

  return base;
};
