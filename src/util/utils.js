var Mustache = require('mustache')
var conf = {
  serverHost: ''
}
var _utils = {
  request: function(param){
    var _this = this;
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || '',
      success: function(res){
        //请求成功
        if(res.status === 0){
          typeof param.success === 'function' && param.success(res.data,res.msg)
        }
        //没有登录状态，需强制登录
        else if(res.status === 10){
          _this.toLogin()
        }
        //请求数据错误
        else if(res.status === 1){
          typeof param.error === 'function' && param.error(res.msg)
        }
      },
      error: function(err){
        typeof param.error === 'function' && param.error(err.statusText)
      }
    })
  },
  //获取服务器地址
  getServerURL: function(path){
    return conf.serverHost + path
  },
  //获取URL参数
  getUrlParam: function(name){
    var reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)')
    var result = window.location.search.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
  },
  //渲染html模板
  renderHtml: function(htmlTemplate,data){
    var result = Mustache.render(htmlTemplate,data)
    return result
  },
  //成功提示
  successTips: function(msg){
    // alert(msg || '操作成功')
    $('.page-warp').html(msg)
  },
  errorTips: function(msg){
    // alert(msg || '操作失败')
    $('.page-warp').html(msg)
  },
  validate: function(value,type){
    var value = $.trim(value)
    //非空验证
    if(type === 'required'){
      return !!value
    }
    //手机号验证
    if(type === 'phone'){
      return /^1\d{10}$/.test(value)
    }
    //邮箱验证
    if(type === 'email'){
      return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value)
    }
  },
  //统一登录处理
  toLogin: function(){
    window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href)
  },
  goHome: function(){
    window.location.href = './index.html'
  }
}

module.exports = _utils