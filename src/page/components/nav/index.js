require('./style.css')
var _utils = require('util/utils')
var _user = require('service/user-service')
var _cart = require('service/cart-service')
var nav = {
  init : function(){
    this.bindEvent()
    this.loadUserInfo()
    this.loaderCartCount()
    //支持继续调用nav
    return this
  },
  bindEvent : function(){
    //登录点击事件
    $('.js-login').click(function(){
      _utils.toLogin()
    })
    //注册点击事件
    $('.js-register').click(function(){
      window.location.href = './user-register.html'
    })
    //退出点击事件
    $('.js-logout').click(function(){
      _user.logout(function(res){
        window.location.reload()
      },function(errMsg){
        _utils.errorTips(errMsg)
      })
    })
  },
  //加载用户信息
  loadUserInfo : function(){
   _user.checkLogin(function(res){
    //siblings()选择当前的兄弟元素
    $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username)
  },function(errMsg){
    // do nothing just check
  })
  },
  //加载购物车信息
  loaderCartCount: function(){
   _cart.getCartCount(function(res){
     $('.nav .cart-count').text(res || 0)
   },function(errMsg){
     $('.nav .cart-count').text(0)     
   })
  }
}

module.exports = nav.init()