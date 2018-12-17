const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');

module.exports = {
  entry: [
    'core-js/modules/es6.promise',
    'core-js/modules/es6.array.iterator',
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    compress: true,
    port: 3003,
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: `${pkg.name}-v${pkg.version}`,
      template: './src/index.ejs',
    }),
  ],
};
