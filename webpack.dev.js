const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3030,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
})