const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const process = require('process');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
    vendor: [
      'script!jquery',
      'script!bootstrap/dist/js/bootstrap.js',
      'bootstrap/dist/css/bootstrap.css',
      'react',
      'react-dom'
		],
    app: './src/js/main.js'
  },

  output: {
    path: 'dist',
    filename: 'bundle.js',
    publicPath: process.env.PUBLIC_PATH || '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.png$/, loader: 'file?name=[name].[ext]' },
      { test: /\.mp3$/, loader: 'file?name=[name].[ext]' },
      { test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url?limit=100000&mimetype=application/font-woff' },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=100000&mimetype=application/octet-stream' },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=100000&mimetype=image/svg+xml' }
    ]
  },
  plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: 'body'
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
	],
	progress: true,
  devtool: 'source-map'
};

if (process.env.NODE_ENV !== 'production') {
	config.entry.vendor = config.entry.vendor.concat([
		'./hotReload',
		'webpack/hot/dev-server'
	]);
  config.module.loaders = config.module.loaders.concat([
    { test: /\.css/, loaders: [
      'style',
      'css?sourceMap'
    ]}
  ]);
} else {
	config.plugins = config.plugins.concat([
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin('[name].css')
	]);
	config.module.loaders = config.module.loaders.concat([
		{ test: /\.css/, loader: ExtractTextPlugin.extract(
			'style',
			'css-loader?sourceMap&minimize'
		)}
	]);
	config.devtool = 'source-map';
	config.debug = false;
}

module.exports = config;
