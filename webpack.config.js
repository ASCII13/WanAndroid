const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const LoadPath = require('./plugin/load-path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcDir = path.resolve(__dirname, 'src');
const outputDir = path.resolve(__dirname, 'miniprogram');

module.exports = {
	entry: (new LoadPath).init({
		src: path.resolve(srcDir, 'app.js'),
	}),
	output: {
		filename: '[name].js',
		path: outputDir
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: 'babel-loader'
		}]
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanStaleWebpackAssets: false,
		}),
		new CopyPlugin({
			patterns: [
				{
					from: srcDir,
					to: outputDir,
					globOptions: {
						ignore: ['**/*.js']
					}
				}
			]
		}),
	]
};