require('page/components/nav/index')
require('page/components/header/index')
require('./style.css')
var _user = require('service/user-service.js')
var _utils = require('util/utils.js')
var navSide = require('page/components/nav-side/index')
var template = require('./template.html')

//page 逻辑部分
var page = {
  init: function () {
    this.onLoad()

  },
  onLoad: function () {
    //初始化左侧菜单
    navSide.init({
      name: 'user-center'
    })
    //加载用户信息
    this.loadUserInfo()
  },
  loadUserInfo: function () {
    var userHtml = ''
    _user.getUserInfo(function (res) {
      userHtml = _utils.renderHtml(template,res)
      $('.pannel-body').html(userHtml)
    }, function (errMsg) {
      _utils.errorTips(errMsg)

    })

  }
}

$(function () {
  page.init()
})