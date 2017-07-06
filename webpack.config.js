var webpack = require('webpack')
var extractTextWebpackPlugin = require('extract-text-webpack-plugin')
var htmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
//环境变量
var NODE_ENV = process.env.NODE_ENV || 'dev'
if(NODE_ENV = 'dev'){
  var staticPath = '/dist/'
}

if(NODE_ENV = 'product'){
  var staticPath = '//s.pengyang7568.com/dist/'
}
//html-webpack-plugin 参数
var getHtmlConfig = function (name,title) {
  return {
    title: title,
    template: './src/view/' + name + '.ejs',
    favicon: './favicon.ico',
    filename: 'view/' + name + '.html',
    inject: true,
    minify:{
      removeTagWhitespace: true,
      collapseWhitespace: true

    },
    chunks: ['common', name]
  }
}


module.exports = {
  entry: {
    'common': './src/page/common/index.js',
    'index': './src/page/index/index.js',
    'list': './src/page/list/index.js',
    'detail': './src/page/detail/index.js',
    'cart': './src/page/cart/index.js',
    'order-confirm': './src/page/order-confirm/index.js',
    'order-list': './src/page/order-list/index.js',
    'order-detail': './src/page/order-detail/index.js',
    'order-payment': './src/page/order-payment/index.js',
    'user-login': './src/page/user-login/index.js',
    'user-register': './src/page/user-register/index.js',
    'user-center': './src/page/user-center/index.js',
    'user-center-update': './src/page/user-center-update/index.js',
    'user-psw-reset': './src/page/user-psw-reset/index.js',
    'user-psw-update': './src/page/user-psw-update/index.js',
    'result': './src/page/result/index.js'
  },
  output: {
    path: './dist',
    publicPath: staticPath,
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
    new htmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
    new htmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),
    new htmlWebpackPlugin(getHtmlConfig('cart','购物车')),
    new htmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认页')),
    new htmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
    new htmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
    new htmlWebpackPlugin(getHtmlConfig('order-payment','支付页面')),
    new htmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
    new htmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
    new htmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
    new htmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
    new htmlWebpackPlugin(getHtmlConfig('user-psw-reset','找回密码')),
    new htmlWebpackPlugin(getHtmlConfig('user-psw-update','修改密码')),
    new htmlWebpackPlugin(getHtmlConfig('result','操作结果'))
  ],
  //webpack-dev-server config
  devServer: {
    port: 8080,
    inline: true,
    contentBase: './view'
  }

}