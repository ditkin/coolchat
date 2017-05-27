var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  entry: {
    newRoom: './src/client/js/newRoom.js',
    sockets: './src/client/js/sockets.js'
  },

  output: {
    path: './dist',
    filename: '[name].js'
  },

  plugins: [
    new HtmlWebpackPlugin({ inlineSource: '.(js|css)$'} ),
    new HtmlWebpackInlineSourcePlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?presets[]=es2015'
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'file-loader' }
    ]
  }
};
