var _utils = require('util/utils')
/*
resolve&reject
预备promise写法
*/ 
var _user = {
   //登出
   logout: function(resolve,reject){
     _utils.request({
       url: _utils.getServerURL('/user/logout.do'),
       method: 'post',
       success: resolve,
       error: reject
     })
   },
   //检查登录状态
   checkLogin: function(resolve,reject){
     _utils.request({
       url: _utils.getServerURL('/user/get_user_info.do'),
       method: 'post',
       success: resolve,
       error: reject
     })
   }

}

module.exports = _user