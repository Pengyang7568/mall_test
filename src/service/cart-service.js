var _utils = require('util/utils')
/*
resolve&reject
预备promise写法
*/
var _cart = {
  //获取购物车数量
  getCartCount: function (resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/cart/get_cart_product_count.do'),
      success: resolve,
      error: reject
    })
  },
  // 添加到购物车
  addToCart: function (productInfo, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/cart/add.do'),
      data: productInfo,
      success: resolve,
      error: reject
    });
  }
}

module.exports = _cart