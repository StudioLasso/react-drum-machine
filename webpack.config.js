var path = require("path");
var webpack = require('webpack');

module.exports = {
    entry: [
    	'./src'
    ],
    output: {
        path: 'lib',
        filename: "react-drum-machine.min.js",
        library: 'ReactDrumMachine',
        libraryTarget: "umd"
    },
    externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'babel-polyfill': 'babelPolyfill'
    },
	module: {
		rules: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
		]
	},
	plugins: [
	 	new webpack.optimize.UglifyJsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		})
	]
}