const path = require('path');
const SRC = path.join(__dirname, 'front-src/');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  context: path.join(__dirname, 'huangsite/'),
  entry: {
    home: './front-src/scripts/home.ts',
    database: './front-src/scripts/database.ts'
  },
  output: {
    path: path.join(__dirname, 'huangsite/static/'),
    filename: 'js/[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['home'],
      template: './front-src/docs/home.pug',
      filename: 'html/home.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['database'],
      template: './front-src/docs/database.pug',
      filename: 'html/database.html'
    }),
    new ExtractTextPlugin('style/[name].css')
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [{
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
    }],

  }

}