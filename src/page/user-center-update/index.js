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
    this.bindEvent()
  },
  onLoad: function () {
    //初始化左侧菜单
    navSide.init({
      name: 'user-center'
    })
    //加载用户信息
    this.loadUserInfo()
  },
  bindEvent: function () {
    var _this = this
    //点击提交按钮的动作
    $(document).on('click', '.btn-sumbit', function () {
      var userInfo = {
          phone: $.trim($('#phone').val()),
          email: $.trim($('#email').val()),
          question: $.trim($('#question').val()),
          answer: $.trim($('#answer').val())
        },
        validateResult = _this.validateForm(userInfo)
      if (validateResult.status) {
        _user.updateUserInfo(userInfo, function (res,msg) {
          _utils.successTips(msg)
          window.location.href = './user-center.html'
        }, function (errMsg) {
          _utils.errorTips(errMsg)
        })
      } else {
        _utils.errorTips(validateResult.msg)
      }
    })

  },
  loadUserInfo: function () {
    var userHtml = ''
    _user.getUserInfo(function (res) {
      userHtml = _utils.renderHtml(template, res)
      $('.pannel-body').html(userHtml)
    }, function (errMsg) {
      _utils.errorTips(errMsg)

    })

  },
  validateForm: function (userInfo) {
    var result = {
      status: false,
      msg: ''
    }
    //验证手机
    if (!_utils.validate(userInfo.phone, 'phone')) {
      result.msg = '手机号码格式不正确'
      return result
    }
    //验证邮箱
    if (!_utils.validate(userInfo.email, 'email')) {
      result.msg = '邮箱格式不正确'
      return result
    }
    //提示问题是否为空验证
    if (!_utils.validate(userInfo.question, 'required')) {
      result.msg = '密码提示问题不能为空'
      return result
    }
    //提示答案是否为空验证
    if (!_utils.validate(userInfo.answer, 'required')) {
      result.msg = '密码提示答案不能为空'
      return result
    }
    result.status = true
    result.msg = '验证通过'
    return result
  }
}

$(function () {
  page.init()
})