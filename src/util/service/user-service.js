var _utils = require('util/utils')
/*
resolve&reject
预备promise写法
*/
var _user = {
  //登出
  logout: function (resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/user/logout.do'),
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  //检查登录状态
  checkLogin: function (resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/user/get_user_info.do'),
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  //用户登录
  login: function (userInfo, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/user/login.do'),
      data: userInfo,
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  //验证用户名是否存在
  checkUsername: function (username, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/user/check_valid.do'),
      data: {
        type: 'username',
        str: username
      },
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  //注册
  register: function (userInfo, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/user/register.do'),
      data: userInfo,
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  //获取密码提示问题
  getQuestion: function (username, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/user/forget_get_question.do'),
      data: {
        username: username
      },
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  //检查密码提示答案
  checkAnswer: function (userInfo, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/user/forget_check_answer.do'),
      data: userInfo,
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  //检查密码提示答案
  resetPassword: function (userInfo, resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/user/forget_reset_password.do'),
      data: userInfo,
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  //获取用户信息
  getUserInfo: function (resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/user/get_information.do'),
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  //更新用户信息
  updateUserInfo: function (userInfo,resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/user/update_information.do'),
      data: userInfo,
      method: 'post',
      success: resolve,
      error: reject
    })
  },
    //登录状态修改密码
  updatePassword: function (userInfo,resolve, reject) {
    _utils.request({
      url: _utils.getServerURL('/user/reset_password.do'),
      data: userInfo,
      method: 'post',
      success: resolve,
      error: reject
    })
  }
}

module.exports = _user