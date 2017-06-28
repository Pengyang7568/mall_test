require('page/components/nav-simple/index')
require('./index.css')
var _utils = require('util/utils.js')

$(function(){
  var type = _utils.getUrlParam('type') || 'default ',
  $element = $('.'+ type +'-success')
  //显示对应的操作提示
  $element.show()
})