const path = require('path');
const SRC = path.join(__dirname, 'front-src/');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  context: path.join(__dirname, 'huangsite/'),
  entry: {
    home: './front-src/scripts/home.ts',
    database: './front-src/scripts/database.ts',
    canvas: './front-src/scripts/canvas.ts',
    webmMaker: './front-src/scripts/webmmaker.ts',
    index: './front-src/scripts/index.tsx',
    handleImages: './front-src/scripts/workers/handle-images.tsx',
  },
  output: {
    path: path.join(__dirname, 'huangsite/static/'),
    filename: 'js/[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['home'],
      template: './front-src/docs/home.pug',
      filename: 'html/home.html',
      hash: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['database'],
      template: './front-src/docs/database.pug',
      filename: 'html/database.html',
      hash: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['canvas'],
      template: './front-src/docs/canvas.pug',
      filename: 'html/canvas.html',
      hash: true
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      chunks: ['index'],
      template: './front-src/docs/index.pug',
      filename: '../templates/index.html',
      hash: true
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      chunks: ['webmMaker'],
      template: './front-src/docs/webmmaker.pug',
      filename: 'html/webmmaker.html',
      hash: true
    }),
    new ExtractTextPlugin('style/[name].css')
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    loaders: [{
        test: /\.tsx?$/i,
        use: 'ts-loader'
      }, {
        test: /\.pug$/i,
        use: 'pug-loader'
      }, {
        test: /\.s(a|c)ss$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }, {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'files/[name].[ext]?[hash]'
          }
        }],
      },
      {
        test: /\.prejson$/i,
        use: [{
          loader: 'file-loader'
        }, {
          loader: path.join(__dirname, 'utils', 'prejson-to-json.js'),
        }]
      },
      {
        test: /\.json5$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].json?[hash]'
          }
        }, {
          loader: path.join(__dirname, 'utils', 'json5-to-json.js')
        }, {
          loader: 'json5-loader'
        }],
      }
    ],
  },

}