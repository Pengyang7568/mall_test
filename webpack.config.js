var webpack = require('webpack')
var extractTextWebpackPlugin = require('extract-text-webpack-plugin')
var htmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
//html-webpack-plugin 参数
var getHtmlConfig = function (name,title) {
  return {
    title: title,
    template: './src/view/' + name + '.ejs',
    filename: 'view/' + name + '.html',
    inject: true,
    chunks: ['common', name]
  }
}


module.exports = {
  entry: {
    'common': './src/page/common/index.js',
    'index': './src/page/index/index.js',
    'login': './src/page/login/index.js',
    'result': './src/page/result/index.js'
  },
  output: {
    path: './dist',
    publicPath: '/dist',
    filename: 'js/[name]-[hash].js'
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  resolve: {
    alias: {
      util: path.resolve(__dirname, './src/util'),
      page: path.resolve(__dirname, './src/page'),
      service: path.resolve(__dirname, './src/service'),
      image: path.resolve(__dirname, './src/image'),
      node_modules: path.resolve(__dirname,'./node_modules')
    }
  },
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
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common/commons.js'
    }),
    new extractTextWebpackPlugin('css/[name]-[hash].css'),
    new htmlWebpackPlugin(getHtmlConfig('index','首页')),
    new htmlWebpackPlugin(getHtmlConfig('login','用户登录')),
    new htmlWebpackPlugin(getHtmlConfig('result','操作结果'))
  ],
  //webpack-dev-server config
  devServer: {
    port: 8080,
    inline: true
  }

}