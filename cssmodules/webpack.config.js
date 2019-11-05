const path = require('path');
const webpack = require('webpack');
// const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
     {
      test: /\.scss$/,
      exclude: path.resolve(__dirname, 'src/style'),
      use:[{
        loader:'style-loader'
      },{
        loader:'css-loader',
        options:{
          modules: true,
          localIdentName:'[name]__[local]--[hash:base64:5]'
        }
      },{
        loader:'sass-loader'
      }]
    }, {
      test: /\.scss$/,
      include: path.resolve(__dirname, 'src/style'),
      use:[{
        loader:'style-loader'
      },{
        loader:'css-loader',
        options:{
          modules: true,
          localIdentName:'[name]__[local]--[hash:base64:5]'
        }
      },{
        loader:'sass-loader'
      }]
    },
    {
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