var _utils = require('util/utils')
/*
resolve&reject
预备promise写法
*/
var _product = {
  //获取商品列表
  getProductList: function (listParam, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/product/list.do'),
      data: listParam,
      success: resolve,
      error: reject
    })
  },
  //获取商品详细信息
  getProductDetail: function (productId, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/product/detail.do'),
      data: {
        productId : productId
      },
      success: resolve,
      error: reject
    })
  }
}

module.exports = _product