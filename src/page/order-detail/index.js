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
    orderNumber: _utils.getUrlParam('orderNumber')
  },
  init: function () {
    this.onLoad()
    this.bindEvent()

  },
  onLoad: function () {
    //初始化左侧菜单
    navSide.init({
      name: 'order-list'
    })
    //加载信息
    this.loadDetail()
  },
  bindEvent: function () {
    var _this = this;
    $(document).on('click', '.order-cancel', function () {
      if (window.confirm('确实要取消该订单？')) {
        _order.cancelOrder(_this.data.orderNumber, function (res) {
          _utils.successTips('该订单取消成功');
          _this.loadDetail();
        }, function (errMsg) {
          _utils.errorTips(errMsg);
        });
      }
    })
  },
  loadDetail: function () {
    var _this = this,
      orderDetailHtml = '',
      $content = $('.content');
    _order.getOrderDetail(this.data.orderNumber, function (res) {
      _this.dataFilter(res);
      // 渲染html
      orderDetailHtml = _utils.renderHtml(template, res);
      $content.html(orderDetailHtml);
    }, function (errMsg) {
      $content.html('<p class="err-tip">' + errMsg + '</p>');
    });

  },
  dataFilter: function (data) {
    data.needPay = data.status == 10;
    data.isCancelable = data.status == 10;
  }

}

$(function () {
  page.init()
})