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
  //获取购物车列表
  getCartList: function (resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/cart/list.do'),
      success: resolve,
      error: reject
    })
  },
  //选择购物车商品
  selectProduct: function (productId, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/cart/select.do'),
      data: {
        productId: productId
      },
      success: resolve,
      error: reject
    })
  },
  //取消选择购物车商品
  unselectProduct: function (productId, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/cart/un_select.do'),
      data: {
        productId: productId
      },
      success: resolve,
      error: reject
    })
  },
  //全选
  selectAllProduct: function (resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/cart/select_all.do'),
      success: resolve,
      error: reject
    })
  },
  //取消全选
  unselectAllProduct: function (resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/cart/un_select_all.do'),
      success: resolve,
      error: reject
    })
  },
  //更新数量
  updateProduct: function (productInfo, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/cart/update.do'),
      data: productInfo,
      success: resolve,
      error: reject
    })
  }, // 删除指定商品
  deleteProduct: function (productIds, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/cart/delete_product.do'),
      data: {
        productIds: productIds
      },
      success: resolve,
      error: reject
    });
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