var _utils = require('util/utils')
/*
resolve&reject
预备promise写法
*/
var _payment = {
  //获取订单
  getPaymentInfo: function (orderNumber, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/order/pay.do'),
      data: {
        orderNo: orderNumber
      },
      success: resolve,
      error: reject
    })
  },
  // 获取订单状态
  getPaymentStatus: function (orderNumber, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/query_order_pay_status.do'),
      data: {
        orderNo: orderNumber
      },
      success: resolve,
      error: reject
    });
  }
}

module.exports = _payment