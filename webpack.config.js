'use strict'

const path = require('path')

const webpack = require('webpack')
const merge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const Extract = require('extract-text-webpack-plugin')
const extractOthers = new Extract({ allChunks: true, filename: 'o.[contenthash:base64:8].css' })
const extractMain = new Extract({ allChunks: true, filename: 'm.[contenthash:base64:8].css' })

const autoprefixer = require('autoprefixer')

const nenv = process.env.NODE_ENV

const statsConfig = {
  children: false,
  maxModules: 0
}
const configs = {
  base: {
    entry: {
      main: './src/index.js',
      polyfill: './src/polyfill.js',
      vendor: [
        'prop-types',
        'react',
        'react-dom',
        'react-loadable',
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash:8].js',
      chunkFilename: '[name].[chunkhash:8].js',
      publicPath: '/'
    },
    resolve: {
      modules: ['./src', './public', 'node_modules']
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.s(c|a)ss$/,
        exclude: /node_modules/,
        use: extractMain.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                camelCase: true,
                modules: true,
                minimize: nenv === 'build',
                localIdentName: '[hash:base64:8]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    new autoprefixer()
                  ]
                }
              }
            },
            'sass-loader'
          ]
        })
      }, {
        test: /\.css$/,
        use: extractOthers.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: nenv === 'build',
              }
            }
          ]
        })
      }, {
        test: /\.(jpeg|jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash:base64:8].[ext]'
            }
          }
        ]
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: 'body'
      }),
      extractOthers,
      extractMain,
    ],
    stats: statsConfig
  },
  build: {
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new webpack.NamedChunksPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        comments: false
      }),
      // seperate vendor, polyfill, and webpack runtime from app code for long-term caching
      new webpack.optimize.CommonsChunkPlugin({
        names: ['polyfill', 'vendor', 'runtime'],
        minChunks: Infinity
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'main',
        minChunks: 2,
        children: true,
        deepChildren: true,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
    ],
  },
  dev: {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      compress: true,
      historyApiFallback: true,
      host: '0.0.0.0',
      overlay: true,
      port: 8080,
      // proxying requrests to work-around CORS issues
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:3000',
      //     pathRewrite: {'^/api' : ''}
      //   }
      // },
      stats: statsConfig,
    }
  },

  analyze: {
    plugins: [
      new BundleAnalyzerPlugin({
        defaultSizes: 'gzip'
      }),
    ]
  }
}

if (configs[nenv]) {
  module.exports = merge(configs['base'], configs[nenv])
} else {
  module.exports = configs['base']
}

if (process.env.ANALYZE) {
  module.exports = merge(module.exports, configs['analyze'])
}
