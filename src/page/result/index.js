require('page/components/nav-simple/index')
require('./style.css')
var _utils = require('util/utils.js')

$(function () {
  var type = _utils.getUrlParam('type') || 'default ',
    $element = $('.' + type + '-success')
  if (type === 'payment') {
    var orderNumber = _mm.getUrlParam('orderNumber'),
        $orderNumber = $element.find('.order-number')
    $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber)
  }
  //显示对应的操作提示
  $element.show()
})