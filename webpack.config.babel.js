'use strict';

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
  devtool: isDevelopment ? 'cheap-module-inline-cource-map' : null
}