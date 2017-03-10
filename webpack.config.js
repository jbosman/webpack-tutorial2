var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  "faker",
  "lodash",
  "react",
  "react-dom",
  "react-input-range",
  "react-redux",
  "react-router",
  "redux",
  "redux-form",
  "redux-thunk",
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' // Dynmaically save the file with the entry name (i.e. bundle or vendor)
  },
  module: {
  	rules: [
  		{
  			use: 'babel-loader',
  			test: /\.js$/,
  			exclude: /node_modules/
  		},
  		{
  			use: [ 'style-loader', 'css-loader' ],
  			test: /\.css$/
  		}
  	]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ // If there are any modules that are duplicates between our entry outputs
      names: ['vendor', 'manifest'] // Only put them in the vendor file. Manifest is here to check if the vendor file changed
    }),
    new HtmlWebpackPlugin({ // This plugin allows you to use a template html file and will append script tags
      template: 'src/index.html' // to the end of the body for each output bundle
    })
  ]	
};
