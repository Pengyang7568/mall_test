require('page/components/nav/index')
require('page/components/header/index')
require('./style.css')
var _product = require('service/product-service.js')
var _cart = require('service/cart-service.js')
var _utils = require('util/utils.js')
var template = require('./template.html')

//page 逻辑部分
var page = {
  data: {
      productId: _utils.getUrlParam('productId') || '',
      detailInfo: null
  },
  init: function () {
    this.onLoad()
    this.bindEvent()
  },
  onLoad: function () {
    if (!this.data.productId) {
      _utils.goHome()
    }
    this.loadDetail()
  },
  bindEvent: function () {
    var _this = this
    //图片预览
    $(document).on('mouseenter', '.p-img-item', function () {
      var imageUrl = $(this).find('.p-img').attr('src')
      $('.main-img').attr('src', imageUrl)
    })
    //count的操作
    $(document).on('click', '.p-count-btn', function () {
      var type = $(this).hasClass('plus') ? 'plus' : 'minus',
        $pCount = $('.p-count'),
        currCount = parseInt($pCount.val()),
        minCount = 1,
        maxCount = _this.data.detailInfo.stock || 1
      if (type === 'plus') {
        $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
      } else if (type === 'minus') {
        $pCount.val(currCount > minCount ? currCount - 1 : minCount);
      }
    })
    // 加入购物车
    $(document).on('click', '.cart-add', function () {
      _cart.addToCart({
        productId: _this.data.productId,
        count: $('.p-count').val()
      }, function (res) {
        window.location.href = './result.html?type=cart-add';
      }, function (errMsg) {
        _utils.errorTips(errMsg);
      });
    });

  },
  //加载detail
  loadDetail: function () {
    var html = '',
      _this = this
    _product.getProductDetail(this.data.productId, function (res) {
      _this.data.detailInfo = res
      _this.filter(res)
      html = _utils.renderHtml(template, res)
      $('.page-warp').html(html)
    }, function (errMsg) {
      $('.page-warp').html('<p class="err-tip">找不到此商品</p>')
    })

  },
  filter: function (data) {
    data.subImages = data.subImages.split(',')
  }
}

$(function () {
  page.init()
})