require('./address-modal.css')

var template = require('./address-modal.html')
var _order = require('service/order-service.js')
var _address = require('service/address-service.js')
var _utils = require('util/utils.js')
var _cities = require('util/cities/index.js')

var addressModal = {
  show: function (option) {
    this.$modalWarp = $('.modal-warp')
    //option的绑定
    this.option = option
    this.option.data = option.data || {}
    //渲染modal
    this.renderModal()
    //绑定事件
    this.bindEvent()

  },
  renderModal: function () {
    var addressModalHtml = _utils.renderHtml(template, {
      isUpdate: this.option.isUpdate,
      data: this.option.data
    })
    this.$modalWarp.html(addressModalHtml)
    //加载省份和城市
    this.loadProvince()
  },
  bindEvent: function () {
    var _this = this
    //省份联动城市
    this.$modalWarp.find('#receiver-province').change(function () {
      var selectedProvince = $(this).val()
      _this.loadCity(selectedProvince)
    })
    //提交
    this.$modalWarp.find('.address-btn').click(function () {
      var receiverInfo = _this.getReceiverInfo(),
        isUpdate = _this.option.isUpdate
      //使用新地址，且验证通过
      if (!isUpdate && receiverInfo.status) {
        _address.save(receiverInfo.data, function (res) {
          _utils.successTips('地址添加成功')
          _this.hide()
          typeof _this.option.onSuccess === 'function' &&
            _this.option.onSuccess(res)
        }, function (errMsg) {
          _utils.errorTips(errMsg)

        })

      }
      //更新地址信息，且验证通过
      else if (isUpdate && receiverInfo.status) {
        _address.update(receiverInfo.data, function (res) {
          _utils.successTips('地址修改成功')
          _this.hide()
          typeof _this.option.onSuccess === 'function' &&
            _this.option.onSuccess(res)
        }, function (errMsg) {
          _utils.errorTips(errMsg)

        })

      }
      //以上均不通过
      else {
        _utils.errorTips(receiverInfo.msg)
      }
    })
    // 保证点击modal内容区的时候，不关闭弹窗
    this.$modalWarp.find('.modal-container').click(function (e) {
      e.stopPropagation()
    });
    // 点击叉号或者蒙版区域，关闭弹窗
    this.$modalWarp.find('.close').click(function (e) {
      _this.hide();
    });




  },
  loadProvince: function () {
    var provinces = _cities.getProvinces(),
      $provinceSelect = this.$modalWarp.find('#receiver-province')
    $provinceSelect.html(this.getSelectOption(provinces))
    // 如果是更新地址，并且有省份信息，做省份的回填
    if (this.option.isUpdate && this.option.data.receiverProvince) {
      $provinceSelect.val(this.option.data.receiverProvince);
      this.loadCity(this.option.data.receiverProvince);
    }

  },
  loadCity: function (selectedProvince) {
    var cities = _cities.getCities(selectedProvince)
    $cities = this.$modalWarp.find('#receiver-city')
    $cities.html(this.getSelectOption(cities))
    // 如果是更新地址，并且有城市信息，做城市的回填
    if (this.option.isUpdate && this.option.data.receiverCity) {
      $cities.val(this.option.data.receiverCity);
    }

  },
  //获取表单信息
  getReceiverInfo: function () {
    var receiverInfo = {},
      result = {
        status: false
      }
    receiverInfo.receiverName = $.trim(this.$modalWarp.find('#receiver-name').val());
    receiverInfo.receiverProvince = this.$modalWarp.find('#receiver-province').val();
    receiverInfo.receiverCity = this.$modalWarp.find('#receiver-city').val();
    receiverInfo.receiverAddress = $.trim(this.$modalWarp.find('#receiver-address').val());
    receiverInfo.receiverPhone = $.trim(this.$modalWarp.find('#receiver-phone').val());
    receiverInfo.receiverZip = $.trim(this.$modalWarp.find('#receiver-zip').val());
    if (this.option.isUpdate) {
      receiverInfo.id = this.$modalWarp.find('#receiver-id').val();
    }
    // 表单验证
    if (!receiverInfo.receiverName) {
      result.errMsg = '请输入收件人姓名';
    } else if (!receiverInfo.receiverProvince) {
      result.errMsg = '请选择收件人所在省份';
    } else if (!receiverInfo.receiverCity) {
      result.errMsg = '请选择收件人所在城市';
    } else if (!receiverInfo.receiverAddress) {
      result.errMsg = '请输入收件人详细地址';
    } else if (!receiverInfo.receiverPhone) {
      result.errMsg = '请输入收件人手机号';
    }
    // 所有验证都通过了
    else {
      result.status = true;
      result.data = receiverInfo;
    }
    return result;

  },
  // 获取select框的选项，输入:array，输出: HTML
  getSelectOption: function (optionArray) {
    var html = '<option value="">请选择</option>';
    for (var i = 0, length = optionArray.length; i < length; i++) {
      html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
    }
    return html;
  },
  hide: function () {
    this.$modalWarp.empty()

  }

}

module.exports = addressModal