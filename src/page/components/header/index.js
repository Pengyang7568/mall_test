require('./style.css')

var _util = require('util/utils')
//通用页面头部
var header = {
  init : function(){
    this.bindEvent();
    this.onload()
  },
  onload: function(){
    var keyword = _util.getUrlParam('keyword');
    //keyword存在，则回填input
    if(keyword){
      $('#search-input').val(keyword)
    }
  },
  bindEvent: function(){
    var _this = this
    //点击搜索btn后，搜索提交
    $('#search-btn').click(function(){
       _this.searchSubmit()
    })
    $('#search-input').keyup(function(e){
      if(e.keyCode === 13){
        _this.searchSubmit()
      }
    })
  },
  //搜索的提交
  searchSubmit: function(){
    var keyword = $.trim($('#search-input').val())
    //如果提交的时候有keyword,正常跳转到list页
    if(keyword){
      window.location.href = './list.html?keyword=' + keyword;
    }
    //如果keyword为空，直接返回首页
    else{
      _util.goHome()
    }
  }
}
//header的逻辑自执行
header.init()