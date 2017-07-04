var _utils = require('util/utils')
/*
resolve&reject
预备promise写法
*/
var _order = {
  //获取订单
  getProductList: function (resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/order/get_order_cart_product.do'),
      success: resolve,
      error: reject
    })
  },
  //获取订单
  getOrderList: function (listParam, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/order/list.do'),
      data: listParam,
      success: resolve,
      error: reject
    })
  },
  //提交订单
  createOrder: function (orderInfo, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/order/create.do'),
      data: orderInfo,
      success: resolve,
      error: reject
    })
  },
  // 获取订单详情
  getOrderDetail: function (orderNumber, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/order/detail.do'),
      data: {
        orderNo: orderNumber
      },
      success: resolve,
      error: reject
    })
  },
  // 取消订单
  cancelOrder: function (orderNumber, resolve, reject) {
   _utils.request({
      url:_utils.getServerURL('/order/cancel.do'),
      data: {
        orderNo: orderNumber
      },
      success: resolve,
      error: reject
    });
  }
}

module.exports = _order