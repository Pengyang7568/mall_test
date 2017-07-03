require('./style.css')
var template = require('./template.html')
var _utils = require('util/utils.js')

var Pagination = function () {
  var _this = this
  this.defaultOptions = {
    container: null,
    pagNum: 1,
    pageRange: 3,
    onSelectPage: null
  }
  //事件处理
  $(document).on('click','.pg-item',function(){
     var $this = $(this)
     if($this.hasClass('active') || $this.hasClass('disabled')){
       return
     }
     typeof _this.options.onSelectPage === 'function'
        ? _this.options.onSelectPage($this.data('value')) : null
  })
}
//渲染分页组件
Pagination.prototype.render = function (userOptions) {
  //合并options
  this.options = $.extend({}, this.defaultOptions, userOptions)

  //container判断

  if (!(this.options.container instanceof jQuery)) {
    return
  }

  //判断是否只有一页
  if (this.options.pages <= 1) {
    return
  }

  //渲染分页内容
  this.options.container.html(this.getPaginationHtml())

}

Pagination.prototype.getPaginationHtml = function () {
  var html = '',
      pageArray = [],
      start = this.options.pageNum - this.options.pageRange,
      end = this.options.pageNum + this.options.pageRange
  start = start > 0 ? start : 1
  end = end < this.options.pages ? end : this.options.pages
  //上一页按钮的数据
  pageArray.push({
    name: '上一页',
    value: this.options.prePage,
    disabled: !this.options.hasPreviousPage
  })
  //数字按钮的处理
  for (var i = start; i <= end; i++) {
    pageArray.push({
      name: i,
      value: i,
      active: i === this.options.pageNum
    })
  }
  //下一页按钮的数据
  pageArray.push({
    name: '下一页',
    value: this.options.nextPage,
    disabled: !this.options.hasNextPage
  })

  html = _utils.renderHtml(template,{
    pageArray: pageArray,
    pageNum: this.options.pageNum,
    pages: this.options.pages
  })
  return html
}

module.exports = Pagination