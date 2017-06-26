var webpack = require('webpack')
var extractTextWebpackPlugin = require('extract-text-webpack-plugin')
var htmlWebpackPlugin = require('html-webpack-plugin')
//html-webpack-plugin 参数
var getHtmlConfig = function (name) {
  return {
    title: name,
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}


module.exports = {
  entry: {
    'common': './src/page/common/common.js',
    'index': './src/page/index/index.js',
    'login': './src/page/login/index.js',
    'users': './src/page/users/index.js'
  },
  output: {
    path: './dist',
    publicPath: '/dist',
    filename: 'js/[name]-[hash].js'
  },
  //  externals:{
  //    'jquery': 'window.jQuery'
  //  },
  module: {
    loaders: [{
        test: /.\.css$/,
        loader: extractTextWebpackPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(png|jpg|gif|svg)\??.*$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'resource/[name][hash].[ext]'
        }
      },
      {
        test: /\.(woff|ttf|eot)\??.*$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'resource/[name][hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common/commons.js',
    }),
    new extractTextWebpackPlugin('css/[name]-[hash].css'),
    new htmlWebpackPlugin(getHtmlConfig('index'))
  ],
  devServer:{
    port: 8080,
    inline: true
  }

}