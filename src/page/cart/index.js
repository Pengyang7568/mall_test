require('./style.css')
require('page/components/header/index')

var nav = require('page/components/nav/index')
var _cart = require('service/cart-service.js')
var _utils = require('util/utils.js')
var template = require('./template.html')

//page 逻辑部分
var page = {
  data: {
    carInfo: null

  },
  init: function () {
    this.onLoad()
    this.bindEvent()
  },
  onLoad: function () {
    this.loadCart()
  },
  bindEvent: function () {
    var _this = this
    //单选
    $(document).on('click', '.cart-select', function () {
      var $this = $(this),
        productId = $this.parents('.cart-table').data('product-id')
      //选中状态
      if ($this.is(':checked')) {
        _cart.selectProduct(productId, function (res) {
          _this.renderCart(res)
        }, function (errMsg) {
          _utils.errorTips(errMsg)
        })
      }
      //取消选中
      else {
        _cart.unselectProduct(productId, function (res) {
          _this.renderCart(res)
        }, function (errMsg) {
          _utils.errorTips(errMsg)
        })
      }
    })
    //全选
    $(document).on('click', '.cart-select-all', function () {
      var $this = $(this)
      //选中状态
      if ($this.is(':checked')) {
        _cart.selectAllProduct(function (res) {
          _this.renderCart(res)
        }, function (errMsg) {
          _utils.errorTips(errMsg)
        })
      }
      //取消选中
      else {
        _cart.unselectAllProduct(function (res) {
          _this.renderCart(res)
        }, function (errMsg) {
          _utils.errorTips(errMsg)
        })
      }
    })
    // 商品数量的变化
    $(document).on('click', '.count-btn', function () {
      var $this = $(this),
        $pCount = $this.siblings('.count-input'),
        currCount = parseInt($pCount.val()),
        type = $this.hasClass('plus') ? 'plus' : 'minus',
        productId = $this.parents('.cart-table').data('product-id'),
        minCount = 1,
        maxCount = parseInt($pCount.data('max')),
        newCount = 0
      if (type === 'plus') {
        if (currCount >= maxCount) {
          _utils.errorTips('该商品数量已达到上限');
          return
        }
        newCount = currCount + 1;
      } else if (type === 'minus') {
        if (currCount <= minCount) {
          return
        }
        newCount = currCount - 1;
      }
      // 更新购物车商品数量
      _cart.updateProduct({
        productId: productId,
        count: newCount
      }, function (res) {
        _this.renderCart(res)
      }, function (errMsg) {
        _this.showCartError()
      })
    })
    // 删除单个商品
    $(document).on('click', '.cart-delete', function () {
      if (window.confirm('确认要删除该商品？')) {
        var productId = $(this).parents('.cart-table')
          .data('product-id');
        _this.deleteCartProduct(productId);
      }
    })
    // 删除选中商品
    $(document).on('click', '.delete-selected', function () {
      var arrProductIds = [],
        $selectedItem = $('.cart-select:checked')
      console.log(!$selectedItem)
      if ($selectedItem) {
        if (window.confirm('确认要删除选中的商品？')) {
          // 循环查找选中的productIds
          for (var i = 0, iLength = $selectedItem.length; i < iLength; i++) {
            arrProductIds
              .push($($selectedItem[i]).parents('.cart-table').data('product-id'))
          }
          _this.deleteCartProduct(arrProductIds.join(','))
        }
      } else {
        _utils.errorTips('您还没有选中要删除的商品')
      }
    })
    // 提交购物车
    $(document).on('click', '.btn-submit', function () {
      // 总价大于0，进行提交
      if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
        window.location.href = './order-confirm.html'
      } else {
        _utils.errorTips('请选择商品后再提交')
      }
    })


  },
  // 加载购物车信息
  loadCart: function () {
    var _this = this;
    // 获取购物车列表
    _cart.getCartList(function (res) {
      _this.renderCart(res);
    }, function (errMsg) {
      _utils.errorTips(errMsg)
    })
  },
  //渲染购物车
  renderCart: function (data) {
    this.filter(data)
    this.data.cartInfo = data
    var cartHtml = _utils.renderHtml(template, data)
    $('.page-warp').html(cartHtml)
    nav.loaderCartCount()

  },
  // 删除指定商品，支持批量，productId用逗号分割
  deleteCartProduct: function (productIds) {
    var _this = this;
    _cart.deleteProduct(productIds, function (res) {
      _this.renderCart(res);
    }, function (errMsg) {
      _utils.errorTips(errMsg)
    });
  },
  filter: function (data) {
    data.notEmpty = !!data.cartProductVoList.length
  }

}

$(function () {
  page.init()
})