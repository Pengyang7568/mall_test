require('page/components/nav/index')
require('page/components/header/index')
require('./style.css')
var _product = require('service/product-service.js')
var _utils = require('util/utils.js')
var template = require('./template.html')
//分页组件
var Pagination = require('util/pagination/index.js')


//page 逻辑部分
var page = {
  data: {
    listParam: {
      keyword: _utils.getUrlParam('keyword') || '',
      categoryId: _utils.getUrlParam('categoryId') || '',
      orderBy: _utils.getUrlParam('orderBy') || 'default',
      pageNum: _utils.getUrlParam('pageNum') || 1,
      pageSize: _utils.getUrlParam('pageSize') || 20
    }
  },
  init: function () {
    this.onLoad()
    this.bindEvent()
  },
  onLoad: function () {
    this.loadList()

  },
  bindEvent: function () {
    var _this = this
    //排序的点击事件
    $('.sort-item').click(function(){
      var $this = $(this)
      _this.data.listParam.pageNum = 1
      //默认排序
      if($this.data('type') === 'default'){
         if($this.hasClass('active')){
           return
         }else{
           $this.addClass('active').siblings('.sort-item').removeClass('active asc desc')
           _this.data.listParam.orderBy = 'default'
         }
      }
      //点击价格排序
      else if($this.data('type') === 'price'){
        $this.addClass('active').siblings('.sort-item').removeClass('active asc desc')
      //升序、降序
        if(!$this.hasClass('asc')){
          $this.addClass('asc').removeClass('desc')
           _this.data.listParam.orderBy = 'price_asc'          
        }else{
          $this.addClass('desc').removeClass('asc')
           _this.data.listParam.orderBy = 'price_desc'          
        }
      }
      //重新加载列表
      _this.loadList()
    })

  },
  //加载list
  loadList: function () {
    var _this = this,
        listHtml = '',
        listParam = this.data.listParam
    //删除不必要的字段
    listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId)
    _product.getProductList(listParam, function (res) {
      listHtml = _utils.renderHtml(template,{
        list: res.list
      })
      $('.p-list-con').html(listHtml)
      _this.loadPagination({
        hasPreviousPage : res.hasPreviousPage,
        prePage : res.prePage,
        hasNextPage : res.hasNextPage,
        nextPage : res.nextPage,
        pageNum : res.pageNum,
        pages : res.pages
      })
    }, function (errMsg) {
      _utils.errorTips(errMsg)
    })
  },
  //加载分页信息
  loadPagination: function(pageInfo){
    var _this = this
    //引入分页组件
    this.pagination ? '' : (this.pagination = new Pagination())
    this.pagination.render($.extend({},pageInfo,{
      container: $('.pagination-con'),
      onSelectPage: function(pageNum){
        _this.data.listParam.pageNum = pageNum
        _this.loadList()
      }
    }))

  }


}

$(function () {
  page.init()
})