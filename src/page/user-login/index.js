require('page/components/nav-simple/index')
require('./style.css')
var _user = require('service/user-service.js')
var _utils = require('util/utils.js')
//表单里的错误提示
var formError = {
  show: function (errMsg) {
    $('.error-item').show().find('.error-msg').text(errMsg)
  },
  hide: function (errMsg) {
    $('.error-item').hide().find('.error-msg').text('')
  }
}

var page = {
  init: function () {
    this.bindEvent()
  },
  bindEvent: function () {
    var _this = this
    //登录按钮的点击
    $('.btn-submit').click(function () {
      _this.submit()
    })
    //如果按下回车，也进行提交
    $('.user-content').keyup(function (e) {
      if (e.keyCode === 13) {
        _this.submit()
      }
    })
  },
  //提交表单
  submit: function () {
    var formData = {
        username: $.trim($('#username').val()),
        password: $.trim($('#password').val())
      },
      //验证结果
      validateResult = this.formValidate(formData)
    if (validateResult.status) {
      //成功则提交
      _user.login(formData, function (res) {
        window.location.href = _utils.getUrlParam('redirect') || './index.html'
      }, function (errMsg) {
        formError.show(errMsg)
      })
    } else {
      formError.show(validateResult.msg)
    }
  },
  //表单字段验证
  formValidate: function (formData) {
    var result = {
      status: false,
      msg: ''
    }
    if (!_utils.validate(formData.username, 'required')) {
      result.msg = '用户名不能为空'
      return result
    }
    if (!_utils.validate(formData.password, 'required')) {
      result.msg = '密码不能为空'
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