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
    //username 验证
    $('#username').blur(function(){
      var username = $.trim($(this).val())
      //为空不做异步验证
      if(!username){
        return
      }
      //异步验证用户名是否存在
      _user.checkUsername(username,function(res){
         formError.hide()
      },function(errMsg){
         formError.show(errMsg)
      })
    })
    //注册按钮的点击
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
        password: $.trim($('#password').val()),
        passwordConfirm: $.trim($('#password-confirm').val()),
        phone: $.trim($('#phone').val()),
        email: $.trim($('#email').val()),
        question: $.trim($('#question').val()),
        answer: $.trim($('#answer').val())
      },
      //验证结果
      validateResult = this.formValidate(formData)
    if (validateResult.status) {
      //成功则提交
      _user.register(formData, function (res) {
        window.location.href = './result.html?type=register'
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
    //验证用户名是否为空
    if (!_utils.validate(formData.username, 'required')) {
      result.msg = '用户名不能为空'
      return result
    }
    //验证密码是否为空
    if (!_utils.validate(formData.password, 'required')) {
      result.msg = '密码不能为空'
      return result
    }
    //验证密码长度
    if (formData.password.length<6) {
      result.msg = '密码不能少于6位'
      return result
    }
    //验证两次密码一致
    if (formData.password !== formData.passwordConfirm) {
      result.msg = '两次输入的密码不一致'
      return result
    }
    //验证手机
    if (!_utils.validate(formData.phone, 'phone')) {
      result.msg = '手机号码格式不正确'
      return result
    }
    //验证邮箱
    if (!_utils.validate(formData.email, 'email')) {
      result.msg = '邮箱格式不正确'
      return result
    }
    //提示问题是否为空验证
    if (!_utils.validate(formData.question, 'required')) {
      result.msg = '密码提示问题不能为空'
      return result
    }
    //提示答案是否为空验证
    if (!_utils.validate(formData.answer, 'required')) {
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