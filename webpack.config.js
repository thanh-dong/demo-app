// const webpack = require('webpack');
// const path = require('path');
// // React v.16 uses some newer JS functionality, so to ensure everything
// // works across all browsers, we're adding babel-polyfill here.
// require('babel-polyfill');
//
// module.exports = {
//   entry: [
//     './src/index'
//   ],
//   module: {
//     loaders: [
//       { test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets:['react', 'stage-0']}},
//       { test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader' },
//     ]
//   },
//   resolve: {
//     modules: [
//       path.resolve('./'),
//       path.resolve('./node_modules'),
//     ],
//     extensions: ['.js','.scss'],
//   },
//   output: {
//     path: path.join(__dirname, '/dist'),
//     publicPath: '/',
//     filename: 'bundle.js'
//   },
//   devtool: 'cheap-eval-source-map',
//   devServer: {
//     contentBase: './dist',
//     hot: true
//   },
//   plugins: [
//     new webpack.optimize.OccurrenceOrderPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoEmitOnErrorsPlugin()
//   ]
// };
const webpack = require('webpack');
const path = require('path');
// React v.16 uses some newer JS functionality, so to ensure everything
// works across all browsers, we're adding babel-polyfill here.
require('babel-polyfill');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/dist/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './src/index'
  ],
  module: {
    loaders: [
      { test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets:['react', 'stage-0']}},
      { test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader' },
    ]
  },
  resolve: {
    modules: [
      path.resolve('./'),
      path.resolve('./node_modules'),
    ],
    extensions: ['.js','.scss'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    HTMLWebpackPluginConfig
  ]
};
