require('./index.css')
//侧边导航

var _utils = require('util/utils')
var template = require('./index.html')

var navSide = {
  option: {
    name: '',
    navList: [
      {name:  'user-center',desc: '个人中心',href: './user-center.html'},
      {name:  'order-list',desc: '我的订单',href: './order-list.html'},
      {name:  'pass-update',desc: '修改密码',href: './pass-update.html'},
      {name:  'about',desc: '关于MMall',href: './about.html'}
    ]
  },
  init : function(option){
    //合并选项
    $.extend(this.option,option)
    this.rebderNav()
  },
  //渲染导航菜单
  rebderNav : function(){
    //计算active数据
    for(var i= 0,iLength = this.option.navList.length;i<iLength;i++){
      if(this.option.navList[i].name === this.option.name){
        this.option.navList[i].isActive = true;
      }
    }
    //渲染list数据
    var navhtml = _utils.renderHtml(template,{navList:this.option.navList})
    $('.nav-side').html(navhtml)
  }
}

module.exports = navSide