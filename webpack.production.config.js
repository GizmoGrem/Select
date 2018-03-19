/**
 * Production Webpack Configuration
 */
const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rupture = require('rupture');
const autoprefixer = require('autoprefixer-stylus');
const HappyPack = require('happypack');

const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

module.exports = {

  devtool: false,

  context: resolve(__dirname, 'src'),
  entry: './index',
  output: {
    filename: 'app.[hash].js',
    path: resolve(__dirname, 'build'),
    publicPath: './',
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
      { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=15000&name=[hash:base64:5].[ext]' },
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
      img: resolve(__dirname, 'src/public/img'),
      components: resolve(__dirname, 'src/components'),
      public: resolve(__dirname, 'src/public'),
      ducks: resolve(__dirname, 'src/redux/ducks'),
      libs: resolve(__dirname, 'src/libs'),
    }
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new HappyPack({
      id: 'styl',
      threadPool: happyThreadPool,
      loaders: ['style-loader', 'css-loader', 'stylus-loader']
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: true,
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      comments: false
    }),
    new ExtractTextPlugin({ filename: 'app-[hash].css', disable: false, allChunks: true })
  ]

}