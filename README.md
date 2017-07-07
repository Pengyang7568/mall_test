# mall_test_v1.0

### 技术栈

webapck@1.15.0 + jquery@1.12.3 + font-awesome@4.7.0 + mustache + unslide



### 项目文件目录安排

```
│─ .gitignore
│─ package.json
│─ webpack.config.js
└─src
    ├─image//首页静态图片
    ├─page//页面文件
    ├─service//ajaxApi
    ├─util//通用工具
    └─view//html-webpack-plugin模板文件
```


```
├─common//layout，全局第三方库引用
├─component//各个页面公用组件
└─index
     ├─index.js//页面入口文件
     ├─style.css//页面样式
     └─template.html//mustache渲染模板
        
```

### webpack.config.js


#### html-loader&html-webpack-plugin
view模板文件中可使用`<%= require('./layout/head-common.html')%>`&`<%= htmlWepackPlugin.options.title%>`ejs语法,引入view文件及html-webpack-plugin传参.

在webpack.config.js中配置html-loader处理`template.html`&`<%= require('./layout/head-common.html')%>`
html-webpack-plugin需使用ejs做模板，否则会被html-loader处理，相应参数无法传递
或者使用如下写法`<%= require('html-loader!./layout/head-common.html')%>`


#### webpack-dev-server
```
//webpack-dev-server
devServer:{
  port: 8080,
  inline: true,//热更新
  historyApiFallback: true,//404重定向
  contentBase: './view'//以view为根目录提供文件,解决开发环境各页面跳转
}

```
#### commonsChunkPlugin
```
//抽取公共模块
new CommonsChunkPlugin({
    name: "commons",//具名公共模块,不指定name属性会报错
    filename: "common/commons.js"//打包后的文件目录/文件名
    minChunks: 3,//指定若子模块在3个主模块之间引入则作为公共模块  
    chunks: ['pageA','pageB']//只在数组内的入口文件检索公共模块
})

```

#### html-webpack-plugin

```
//html-webpack-plugin 参数封装
var getHtmlConfig = function (name,title) {
  return {
    title: title,
    template: './src/view/' + name + '.ejs',
    favicon: './favicon.ico',
    filename: 'view/' + name + '.html',
    inject: true,
    //view文件的压缩,webpack -p 只压缩相应js模块
    minify:{
      removeTagWhitespace: true,//移除空标签
      collapseWhitespace: true//移除空格
    },
    chunks: ['common', name]//指定需要引入的主模块文件，实现多页面开发
  }
}
```
#### NODE_ENV(环境变量)

```
//环境变量
var NODE_ENV = process.env.NODE_ENV || 'dev'
if(NODE_ENV === 'dev'){
  var staticPath = '/dist/'
}

if(NODE_ENV === 'product'){
  var staticPath = '//s.pengyang7568.com/dist/'
}

//对应的script脚本(windows)
"dev_build": "set NODE_ENV=dev&&webpack",
"product_build": "set NODE_ENV=product&&webpack -p"
```
