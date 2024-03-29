const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  // entry: './src/index',
  entry: {
    index: './src/index',
    play: './src/js/play',
    end: './src/js/end'
  },
  output: {
    filename: 'bundle.[name].js',
    chunkFilename: '[name].shared.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader"
        ]
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts",".js"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/styles.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: '首頁',
      filename: 'index.html',
      template: './src/pages/index.pug',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      title: '遊戲中',
      filename: 'play.html',
      template: './src/pages/play.pug',
      chunks: ['play']
    }),
    new HtmlWebpackPlugin({
      title: '遊戲結束',
      filename: 'end.html',
      template: './src/pages/end.pug',
      chunks: ['end']
    })
  ]
}