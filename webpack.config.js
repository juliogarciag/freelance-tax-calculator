const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env = {}) => {
  const isProduction = env.production;
  const moduleClassName = isProduction ? '[hash:base64]' : '[name]--[local]';
  const outputFilename = isProduction ? 'bundle.[chunkhash].js' : 'bundle.js';

  return {
    entry: './app/index.js',
    output: {
      path: `${__dirname}/public`,
      filename: outputFilename
    },
    resolve: {
      modules: [
        path.resolve('./app'),
        'node_modules'
      ],
      extensions: ['.js', '.json', '.jsx'],
      enforceExtension: false
    },
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      hot: true
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': `'${env.production ? 'production' : 'development'}'`
      }),
      new HtmlWebpackPlugin({
        template: 'app/index.html',
        favicon: 'app/assets/favicon.png',
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
      }),
      new ExtractTextPlugin({
        filename: 'styles.css',
        disable: !isProduction
      }),
      ...(isProduction ? [
        new CleanWebpackPlugin(['public'], {
          exclude: ['.keep']
        }),
        new webpack.optimize.UglifyJsPlugin({
          comments: false,
          sourceMap: false
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new WebpackMd5Hash()
      ] : [])
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: {
              loader: 'style-loader'
            },
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true, localIdentName: moduleClassName, sourceMap: !isProduction
                }
              },
              { loader: 'resolve-url-loader' },
              { loader: 'sass-loader', options: { sourceMap: !isProduction } }
            ]
          })
        },
        {
          test: /\.(ico|png|jpg|jpeg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file-loader'
        }
      ]
    }
  };
};
