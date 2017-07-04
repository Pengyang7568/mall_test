require('./style.css')
require('page/components/header/index')
require('page/components/nav/index')

var _order = require('service/order-service.js')
var _address = require('service/address-service.js')
var _utils = require('util/utils.js')
var _addressModal = require('./address-modal/address-modal.js')
var addressTemplate = require('./address-list.html')
var productTemplate = require('./product-list.html')


//page 逻辑部分
var page = {
  data: {
    selectedAddressId: null

  },
  init: function () {
    this.onLoad()
    this.bindEvent()
  },
  onLoad: function () {
    this.loadAddressList()
    this.loadProductList()
  },
  bindEvent: function () {
    var _this = this
    //地址的选择
    $(document).on('click', '.address-item', function () {
      $(this).addClass('active').siblings('.address-item').removeClass('active')
      _this.data.selectedAddressId = $(this).data('id')
    })
    //订单的提交
    $(document).on('click', '.order-submit', function () {
      var shippingId = _this.data.selectedAddressId
      if (shippingId) {
        _order.createOrder({
          shippingId: shippingId
        }, function (res) {
          window.location.href = './order-payment.html?orderNumber=' + res.orderNo

        }, function (errMsg) {
          _utils.errorTips(errMsg)
        })
      } else {
        _utils.errorTips('请选择地址后提交')
      }
    })
    //地址的添加
    $(document).on('click', '.address-add', function () {
      _addressModal.show({
        isUpdate: false,
        onSuccess: function () {
          _this.loadAddressList()
        }
      })
    })
    //地址的修改
    $(document).on('click', '.address-update', function (e) {
      //阻止上面冒泡触发active
      e.stopPropagation()
      var shippingId = $(this).parents('.address-item').data('id')
      _address.getAddress(shippingId, function (res) {
        _addressModal.show({
          isUpdate: true,
          data: res,
          onSuccess: function () {
            _this.loadAddressList()
          }
        })
      }, function (errMsg) {
        _utils.errorTips(errMsg)
      })
    })
    //地址的删除
    $(document).on('click', '.address-delete', function (e) {
      e.stopPropagation()
      var id = $(this).parents('.address-item').data('id')
      if (window.confirm('确认要删除该地址？')) {
        _address.deleteAddress(id, function (res) {
          _this.loadAddressList();
        }, function (errMsg) {
          _utils.errorTips(errMsg);
        });
      }
    })
  },
  loadAddressList: function () {
    var _this = this
    //获取地址列表
    _address.getAddressList(function (res) {
      _this.addressFilter(res)
      var addressHtml = _utils.renderHtml(addressTemplate, res)
      $('.address-con').html(addressHtml)
    }, function (errMsg) {
      _utils.errorTips(errMsg)

    })
  },
  // 处理地址列表中选中状态
  addressFilter: function (data) {
    if (this.data.selectedAddressId) {
      var selectedAddressIdFlag = false;
      for (var i = 0, length = data.list.length; i < length; i++) {
        if (data.list[i].id === this.data.selectedAddressId) {
          data.list[i].isActive = true;
          selectedAddressIdFlag = true;
        }
      };
      // 如果以前选中的地址不在列表里，将其删除
      if (!selectedAddressIdFlag) {
        this.data.selectedAddressId = null;
      }
    }
  },
  loadProductList: function () {
    var _this = this
    //获取地址列表
    _order.getProductList(function (res) {
      var productHtml = _utils.renderHtml(productTemplate, res)
      $('.product-con').html(productHtml)
    }, function (errMsg) {
      _utils.errorTips(errMsg)

    })

  },
  filter: function (data) {
    data.notEmpty = !!data.cartProductVoList.length
  }

}

$(function () {
  page.init()
})