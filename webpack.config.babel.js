'use strict';

import {HotModuleReplacementPlugin} from 'webpack'
import path from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin  from 'extract-text-webpack-plugin'

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

export default {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },

  watch: isDevelopment,
  // devtool: isDevelopment ? 'cheap-module-inline-cource-map' : null,
  devtool: 'cheap-module-inline-cource-map',
  devServer: {
    hot: true,
    contentBase: "dist"
  },


  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: "babel"
      }, {
        test: /\.jade$/,
        loader: "jade"
      }, {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('css!stylus')
      }
    ]
  },


  plugins: [
    new ExtractTextPlugin('[name].css', {allChunks: true}),
    new HtmlWebpackPlugin(),
    new HotModuleReplacementPlugin()
  ]
}