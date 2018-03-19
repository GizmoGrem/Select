/**
 * Development Webpack Configuration
 */

let { resolve } = require('path');
let webpack = require('webpack');
let DashboardPlugin = require('webpack-dashboard/plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let rupture = require('rupture');
let autoprefixer = require('autoprefixer-stylus');
let HappyPack = require('happypack');

let happyThreadPool = HappyPack.ThreadPool({ size: 5 });



module.exports = {
	devtool: 'cheap-module-eval-source-map',

	context: resolve(__dirname, 'src'),

	entry: [
		'react-hot-loader/patch',
		`webpack-dev-server/client?http://${process.env.NODE_HOST || '10.10.0.161'}:${process.env.NODE_PORT || 8080}`,
		'./'
	],

	output: {
		filename: 'app-[hash].js',
		path: resolve(__dirname, 'build'),
		publicPath: '/',
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.styl$/,
				loader: 'happypack/loader?id=styl',
			},
			{ test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=15000&name=[name]-[hash].[ext]' },
			{ test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{ test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' }
		]
	},

	resolve: {
		extensions: ['.js', '.jsx', '.styl'],
		alias: {
			img:resolve(__dirname, 'src/public/img'),
			components: resolve(__dirname, 'src/components'),
			public: resolve(__dirname, 'src/public'),
			ducks: resolve(__dirname, 'src/redux/ducks'),
			libs: resolve(__dirname, 'src/libs'),

		}
	},

	devServer: {
		host: process.env.NODE_HOST || '10.10.0.161',
		port: process.env.NODE_PORT || 8080,
		contentBase: resolve(__dirname, 'build'),
		publicPath: '/',
		historyApiFallback: true,
		hot: true,
		noInfo: false,
		stats: {
			assets: true,
			children: false,
			chunks: false,
			hash: false,
			modules: false,
			publicPath: false,
			timings: true,
			version: false,
			warnings: true,
			colors: true
		}
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
			}
		}),

		new webpack.optimize.ModuleConcatenationPlugin(),
		new HtmlWebpackPlugin({
			template: `${__dirname}/src/index.html`,
			filename: 'index.html',
			inject: 'body',
		}),
		new HappyPack({
			id: 'styl',
			threadPool: happyThreadPool,
			loaders: ['style-loader', 'css-loader', 'stylus-loader']
		}),

		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
			options: {
				context: __dirname,
				stylus: {
					import: `${__dirname}/src/styles/global.styl`,
					use: [
						rupture(),
						autoprefixer({
							browsers: ['last 3 versions']
						})
					]
				}
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		new DashboardPlugin(),
	]
}