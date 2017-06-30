require('page/components/nav/index')
require('page/components/header/index')
require('./style.css')
var _user = require('service/user-service.js')
var _utils = require('util/utils.js')
var navSide = require('page/components/nav-side/index')

//page 逻辑部分
var page = {
  init: function () {
    this.onLoad()
    this.bindEvent()
  },
  onLoad: function () {
    //初始化左侧菜单
    navSide.init({
      name: 'user-psw-update'
    })
  },
  bindEvent: function () {
    var _this = this
    //点击提交按钮的动作
    $(document).on('click', '.btn-sumbit', function () {
      var userInfo = {
          password: $.trim($('#password').val()),
          passwordNew: $.trim($('#password-new').val()),
          passwordConfirm: $.trim($('#password-confirm').val()),
        },
        validateResult = _this.validateForm(userInfo)
      if (validateResult.status) {
        _user.updatePassword({
          passwordOld: userInfo.password,
          passwordNew: userInfo.passwordNew
        }, function (res,msg) {
          _utils.successTips(msg)
        }, function (errMsg) {
          _utils.errorTips(errMsg)
        })
      } else {
        _utils.errorTips(validateResult.msg)
      }
    })

  },
  validateForm: function (userInfo) {
    var result = {
      status: false,
      msg: ''
    }
    //提示旧密码是否为空验证
    if (!_utils.validate(userInfo.password, 'required')) {
      result.msg = '原密码不能为空'
      return result
    }
    //验证新密码长度
    if(!userInfo.passwordNew || userInfo.passwordNew.length<6){
      result.msg = '新密码不得少于6位'
      return result;
    }
    //验证两次输入是否一致
    if (userInfo.passwordNew !== userInfo.passwordConfirm) {
      result.msg = '两次输入的密码不一致'
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