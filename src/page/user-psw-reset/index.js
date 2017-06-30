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
  data: {
    username: '',
    question: '',
    answer: '',
    token: '',
  },
  init: function () {
    this.onLoad()
    this.bindEvent()
  },
  onLoad: function () {
    this.loadStepUsername()
  },
  bindEvent: function () {
    var _this = this
    //用户名验证
    $('#submit-username').click(function () {
      var username = $.trim($('#username').val())
      //用户名不为空
      if (username) {
        _user.getQuestion(username, function (res) {
          _this.data.username = username
          _this.data.question = res
          _this.loadStepQuestion()

        }, function (errMsg) {
          formError.show(errMsg)
        })
      }
      //用户名为空
      else {
        formError.show('请输入用户名')
      }
    })
    //问题答案验证
    $('#submit-question').click(function () {
      var answer = $.trim($('#answer').val())
      //答案不为空
      if (answer) {
        //检查答案
        _user.checkAnswer({
          username: _this.data.username,
          question: _this.data.question,
          answer: answer
        }, function (res) {
          _this.data.answer = answer
          _this.data.token = res
          _this.loadStepPassword()

        }, function (errMsg) {
          formError.show(errMsg)
        })
      }
      //答案为空
      else {
        formError.show('请输入答案')
      }
    })
    //新密码提交
    $('#submit-password').click(function () {
      var password = $.trim($('#password').val())
      //答案不为空且大于6位
      if (password && password.length >= 6) {
        //检查答案
        _user.resetPassword({
          username: _this.data.username,
          passwordNew: password,
          forgetToken: _this.data.token
        }, function (res) {
          window.location.href = './result.html?type=psw-reset'
        }, function (errMsg) {
          formError.show(errMsg)
        })
      }
      //小于6位
      else {
        formError.show('密码不能少于6位')
      }
      //答案为空
      if (!password) {
        formError.show('请输入答案')
      }
    })

  },
  //加载输入用户名
  loadStepUsername: function () {
    $('.step-username').show()
  },
  //加载输入密码提示问题答案
  loadStepQuestion: function () {
    //清除错误提示
    formError.hide()
    //容器的切换
    $('.step-username').hide()
      .siblings('.step-question').show()
      .find('.question').text(this.data.question)

  },
  //加载新密码
  loadStepPassword: function () {
    //清除错误提示
    formError.hide()
    //容器的切换
    $('.step-question').hide()
      .siblings('.step-password').show()

  }
}



$(function () {
  page.init()
})