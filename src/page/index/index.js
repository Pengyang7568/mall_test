require('page/components/nav/index')
require('page/components/header/index')
require('./style.css')
require('util/slider/index')

var sliderTemplate = require('./slider.html')

var _utils = require('util/utils.js')


$(function () {
  var sliderHtml = _utils.renderHtml(sliderTemplate)
  $('.banner-con').html(sliderHtml)
  //初始化slider
  var $slider = $('.banner').unslider({
    dots: true
  })
  // 前一张和后一张操作的事件绑定
  $('.banner-con .banner-arrow').click(function () {
    var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    $slider.data('unslider')[forward]();
  });
})