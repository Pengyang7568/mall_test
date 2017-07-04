require('page/components/nav/index')
require('page/components/header/index')
require('./style.css')
var _payment = require('service/payment-service.js')
var _utils = require('util/utils.js')

var template = require('./template.html')



//page 逻辑部分
var page = {
  data: {
    orderNumber: _utils.getUrlParam('orderNumber')
  },
  init: function () {
    this.onLoad()
  },
  onLoad: function () {
    this.loadPaymentInfo()
  },
  loadPaymentInfo: function () {
    var _this = this,
        $pageWarp = $('.page-warp'),
        paymentHtml = ''
    _payment.getPaymentInfo(this.data.orderNumber, function (res) {
      paymentHtml = _utils.renderHtml(template, res)
      $pageWarp.html(paymentHtml)
      _this.listenOrderStatus()
    }, function (errMsg) {
      _utils.errorTips(errMsg)
    })

  },
  // 监听订单状态
  listenOrderStatus: function () {
    var _this = this;
    this.paymentTimer = window.setInterval(function () {
      _payment.getPaymentStatus(_this.data.orderNumber, function (res) {
        if (res == true) {
          window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
        }
      })
    }, 5e3)
  }

}

$(function () {
  page.init()
})