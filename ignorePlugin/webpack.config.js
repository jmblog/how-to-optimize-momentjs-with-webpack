const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
    new UglifyJSPlugin({ sourceMap: true }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Ignore all optional deps of moment.js
  ],
};
