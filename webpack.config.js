const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const devPort = 9000;
const flaskEndPoint = ' http://127.0.0.1:5000'
const webpack = require('webpack');

module.exports = function webpackConfig() {
  return {
    devtool: 'source-map',
    entry: [
      './src/index.jsx'
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath : '/'
    },
    module: {
      rules: [
        // {
        //   enforce: 'pre',
        //   test: /\.(js|jsx)$/,
        //   exclude: /node_modules/,
        //   loader: 'eslint-loader'
        // },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // {
        //   test: /\.scss$/,
        //   exclude: /node_modules/,
        //   use: [
        //     'style-loader', // creates style nodes from JS strings
        //     'css-loader', // translates CSS into CommonJS
        //     'sass-loader' // compiles Sass to CSS, using Node Sass by default
        //   ]
        // }
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            // resolve-url-loader may be chained before sass-loader if necessary
            use: ['css-loader', 'sass-loader']
          })
        },
        // CSS File [Not using SASS Loader]
        // {
        //   test: /\.css$/,
        //   use: ExtractTextPlugin.extract({
        //     fallback: 'style-loader',
        //     use: ['css-loader']
        //   })
        // }
        {
          test: /\.css$/,
          loaders: ["style-loader","css-loader"]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name:'[name].[ext]',
            outputPath:'assets' //the icons will be stored in dist/assets folder
          }
        }
      ]
      // loaders: [
      //   { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      //   { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
      // ]
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body'
      }),
      new CopyWebpackPlugin([{ from: 'src/assets/images', to: 'assets/images' }])
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      // alias: {
      //   components: path.resolve(__dirname, 'src/react-app/components')
      // }
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      historyApiFallback: true,
      port: devPort
    },
    externals: {
      // global app config object
      config: JSON.stringify({
          apiUrl: flaskEndPoint,
          permission: 'guest'
    })
  }
  };
};
