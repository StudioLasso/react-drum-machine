const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var host = (process.env.HOST || 'localhost');
var port = process.env.PORT || 8080;

const config = {
	entry: [
		'./assets/img/hihat.png',
		'./assets/img/kick.png',
		'./assets/img/snare.png',
		'./assets/img/tome1.png',
		'./assets/img/bass.png',
		'./assets/sounds/hihat.mp3',
		'./assets/sounds/kick.mp3',
		'./assets/sounds/snare.mp3',
		'./assets/sounds/bass-musclemuseum.mp3',
		'./assets/sounds/tom1.mp3',
 		'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
 		'script!jquery',
		'script!bootstrap/dist/js/bootstrap.js',
		'bootstrap/dist/css/bootstrap.css',
		'react',
		'react-dom',
		'./js/index'
	],

	output: {
		path: path.resolve('./dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		alias: {
			'react-drum-machine': process.env.NODE_ENV === 'development' ? '../../src' : '../../lib' 
		}
	},
	module: {
		loaders: [
		{ test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
		{ test: /js(\/|\\).*\.css$/, loaders: ['style', 'css?sourceMap&modules']},
		{ test: /\.css$/, loaders: ['style', 'css?sourceMap'], exclude: /js(\/|\\).*\.css$/},
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
			template: './index.html',
			inject: 'body'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	progress: true,
	devtool: 'source-map'
};

module.exports = config;
