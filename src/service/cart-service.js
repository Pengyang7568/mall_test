var _utils = require('util/utils')
/*
resolve&reject
预备promise写法
*/ 
var _cart = {
   //获取购物车数量
   getCartCount: function(resolve,reject){
     _utils.request({
       url: _utils.getServerURL('/cart/get-cart_product_count.do'),
       success: resolve,
       error: reject
     })
   }
}

module.exports = _cart