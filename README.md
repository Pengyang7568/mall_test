# mall_test_v1.0

### 技术栈

webapck@1.15.0 + jquery@1.12.3 + font-awesome@4.7.0 + mustache + unslide



### 项目文件目录

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

#### 分页组件
|上一页| 1 2 3 =4= 5 6 7 |下一页| 4/9
```
// 列表参数
listParam: {
  keyword: _utils.getUrlParam('keyword') || '',
  categoryId: _utils.getUrlParam('categoryId') || '',
  orderBy: _utils.getUrlParam('orderBy') || 'default',
  pageNum: _utils.getUrlParam('pageNum') || 1,
  pageSize: _utils.getUrlParam('pageSize') || 20
    }
// 分页参数
pageInfo = {
  hasPreviousPage : Boolean,
  prePage: Number,
  hasNextPage : Boolean,
  nextPage: Number,
  PageNum: Number,
  pages : Number
}
// 组件
loadPagination : function(pageInfo) {
  this.pagination ? '' : (this.pagination = new Pagination())
  this.pagination.render($.extend({}, pageInfo, {
    container: $('.pagination-con'),
    onSelectPage: function(pageNum) {
        _this.data.listParam.pageNum = pageNum
        _this.loadList()
    }
  }))
}
// utils/pagination
require('./style.css)
var template = require('./template.html)
var _utils = require('util/utils.js)

var Pagination = function() {
  var _this = this
  this.defaultOptions = {
    // jquery container
    container : null,
    // current page
    pageNum: 1,
    // 当前页前后显示的页码数
    pageRange: 3,
    //callback
    onSelectPage: null
  }
  //  事件的处理
  $(document).on('click', '.pg-item', function() {
    var $this = $(this)
    //  active 和 disabled 按钮点击，不做处理
    if ($this.hasClass('active') || $this.hasClass('disabled')) {
      return
    }
    typeof _this.options.onSelectPage === 'function' ? 
      _this.opyions.onSelectPage($this.data('value)) : null
  })
}
// 渲染分页组件
Pagination.prototype.render = function(userOptions) {
  // 合并option
  this.options = $.extend({}, this,defaultOption, userOption)
  // container 判断
  if (!(options.container instanceof jQuery)) {
      return
  }
  // 判读是否只有1页
  if (this.option.pages <= 1) {
    return
  }
  // 渲染分页内容
  this.option.container.html(this.getPaginationHtml())
}

// 获取分页的html
Pagination.prototype.getPaginationHtml = function() {
  var html = '',
      options = this.options,
      pageArray = [],
      //  起始页
      start = options.pageNum - options.pageRange > 0 ?
        options.pageNum - options.pageRange : 1,
      end = options.pageNum + options.pageRange > options.pages ? 
        pages : options.pageNum + options.pageRange
  //  上一页按钮的数据
  pageArray.push({
    name: '上一页',
    value: options.prePage,
    disabled: !options.hasPreviousPage
  })
  //  数字按钮的处理
  for (var i = start; i <= end; i++) {
    pageArray.push({
      name: i,
      value: i,
      active: (i === options.pageNum)
    })
  }
  //  下一页按钮的数据
  pageArray.push({
    name: '下一页',
    value: options.nextPage,
    disabled: !options.hasNextPage
  })
  //  html渲染
  html = _utils.renderHtml(template, {
    pageArray : pageArray,
    pageNum : options.pageNum,
    pages: options.pages
  })
  return html
}

