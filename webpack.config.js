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
		'babel-polyfill',
		'react',
		'react-dom'
		],
		app: [
		'./src/assets/img/hihat.png',
		'./src/assets/img/kick.png',
		'./src/assets/img/snare.png',
		'./src/assets/img/tome1.png',
		'./src/assets/img/bass.png',
		'./src/assets/sounds/hihat.mp3',
		'./src/assets/sounds/kick.mp3',
		'./src/assets/sounds/snare.mp3',
		'./src/assets/sounds/bass-musclemuseum.mp3',
		'./src/assets/sounds/tom1.mp3',
		'./src/index'
		]
	},

	output: {
		path: path.resolve('./dist'),
		filename: 'bundle.js',
		publicPath: process.env.PUBLIC_PATH || '/'
	},
	resolve: {
		modulesDirectories: [
		'node_modules',
		'src/js'
		]
	},
	module: {
		loaders: [
		{ test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
		{ test: /\.png$/, loader: 'file?name=img/[name].[ext]' },
		{ test: /\.mp3$/, loader: 'file?name=sounds/[name].[ext]' },
		{ test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url?limit=100000&mimetype=application/font-woff&name=fonts/[name].[ext]' },
		{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=100000&mimetype=application/octet-stream&name=fonts/[name].[ext]' },
		{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file?name=fonts/[name].[ext]' },
		{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=100000&mimetype=image/svg+xml&name=fonts/[name].[ext]' }
		]
	},
	plugins: [
	new HtmlWebpackPlugin({
		template: './src/index.html',
		inject: 'body'
	}),
	new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
	new webpack.DefinePlugin({
		API_GET_DRUMKIT: JSON.stringify(process.env.API_GET_DRUMKIT || '/api/getdrumkit'),
		__DEVTOOLS__: process.env.NODE_ENV !== 'production',
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV)
		}
	}),
	new webpack.ProvidePlugin({
		'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
	})
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
	config.plugins.push(new webpack.HotModuleReplacementPlugin());
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
