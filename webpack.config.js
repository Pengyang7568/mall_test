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