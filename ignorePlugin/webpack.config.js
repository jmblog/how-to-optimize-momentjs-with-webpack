const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: [path.resolve(__dirname, '../index.js')],
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].js',
    library: '[name]',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Ignore all optional deps of moment.js
  ],
  resolve: {
    root: path.resolve(__dirname, './'),
    modulesDirectories: ['node_modules'],
  },
};
