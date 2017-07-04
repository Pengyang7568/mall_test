var _utils = require('util/utils')
/*
resolve&reject
预备promise写法
*/
var _address = {
  //获取地址列表
  getAddressList: function (resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/shipping/list.do'),
      data: {
        pageSize: 50
      },
      success: resolve,
      error: reject
    })
  },
  //新建地址
  save: function (addressInfo, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/shipping/add.do'),
      data: addressInfo,
      success: resolve,
      error: reject
    })
  },
  //更新地址
  update: function (addressInfo, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/shipping/update.do'),
      data: addressInfo,
      success: resolve,
      error: reject
    })
  },
  //删除地址
  deleteAddress: function (shippingId, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/shipping/del.do'),
      data: {
        shippingId: shippingId
      },
      success: resolve,
      error: reject
    })
  },
  //获取单条地址信息
  getAddress: function (shippingId, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/shipping/select.do'),
      data: {
        shippingId: shippingId
      },
      success: resolve,
      error: reject
    })
  }
}

module.exports = _address