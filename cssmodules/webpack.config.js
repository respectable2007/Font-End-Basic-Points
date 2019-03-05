const path = require('path');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        { loader: miniCssExtractPlugin.loader,
          options: {
            publicPath: './build/style'
          } 
        },
        { loader: 'css-loader',
          options: {
            modules: true,//开启css modules功能
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        }
      ]
    },{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader'
      }]
    }
  ]},
  plugins: [
    // new htmlWebpackPlugin({
    //   title: 'css modules',
    //   filename: 'index.html'
    // }),
    new miniCssExtractPlugin({
      filename:'[name].css',
      chunkFilename: '[id].css'
    })
  ]
}