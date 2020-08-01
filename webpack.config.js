'use strict';

let path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Autoprefixer = require('autoprefixer');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: 'production',
  entry: './src/js/main.js',
  output: {
    filename: 'js/[name].[contenthash].js',
    path: __dirname + '/dist'
  },
  watch: true,

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
                debug: true,
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      },
      {
        test: /\.png|jpg|svg|gif$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'icons',
            publicPath: '../icons'
          },
        }
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /(node_modules|bower_components)/,
        use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true
          },
        },
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
              plugins: [
                  Autoprefixer({
                    overrideBrowserslist:['ie >= 8', 'last 4 version']
                  })
              ],
              sourceMap: true
          }
        },
        'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: path.resolve(__dirname, 'dist/index.html')
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/img'),
          to: path.resolve(__dirname, 'dist/img')
        },
        {
          from: path.resolve(__dirname, 'src/icons'),
          to: path.resolve(__dirname, 'dist/icons')
        },
        {
          from: path.resolve(__dirname, 'db.json'),
          to: path.resolve(__dirname, 'dist/db.json')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.[hash].css'
    }),
  ]
};
