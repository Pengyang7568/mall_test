require('page/components/nav/index')
require('page/components/header/index')
require('./style.css')
var _order = require('service/order-service.js')
var _utils = require('util/utils.js')
var navSide = require('page/components/nav-side/index')
var template = require('./template.html')

//分页组件
var Pagination = require('util/pagination/index.js')

//page 逻辑部分
var page = {
  data: {
    listParam: {
      pageNum: 1,
      pageSize: 10

    }
  },
  init: function () {
    this.onLoad()

  },
  onLoad: function () {
    //初始化左侧菜单
    navSide.init({
      name: 'order-list'
    })
    //加载用户信息
    this.loadOrderList()
  },
  loadOrderList: function () {
    var orderListHtml = '',
      _this = this,
      $listCon = $('.order-list-con')
    _order.getOrderList(this.data.listParam, function (res) {
      _this.dataFilter(res)
      orderListHtml = _utils.renderHtml(template, res)
      $listCon.html(orderListHtml)
      _this.loadPagination({
        hasPreviousPage: res.hasPreviousPage,
        prePage: res.prePage,
        hasNextPage: res.hasNextPage,
        nextPage: res.nextPage,
        pageNum: res.pageNum,
        pages: res.pages
      })

    }, function (errMsg) {

    })


  },
  dataFilter: function (data) {
    data.isEmpty = !data.list.length
  },
  //加载分页信息
  loadPagination: function (pageInfo) {
    var _this = this
    //引入分页组件
    this.pagination ? '' : (this.pagination = new Pagination())
    this.pagination.render($.extend({}, pageInfo, {
      container: $('.pagination-con'),
      onSelectPage: function (pageNum) {
        _this.data.listParam.pageNum = pageNum
        _this.loadOrderList()
      }
    }))

  }
}

$(function () {
  page.init()
})