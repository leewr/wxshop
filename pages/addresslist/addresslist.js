var app = getApp()
var apiData = require('../../api/detail.js');
var detailData = apiData.detail()
Page({
  data: {
    index: 0,
    addressData: '',
    addressDataLength: 1,
    provinceData: ['北京', '天津', '合肥'],
    cityIndex: 0,
    cityData: ['長沙','唱得']
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //收货地址列表
    wx.request({
      url: 'http://47.90.38.178:8080/wx_shop_test/shipping/list.do',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        pageNum: 1,
        pageSize: 10
      },
      success: function (obj) {
        console.log(obj)
        that.setData({
          addressData: obj.data.data.list,
          addressDataLength: obj.data.data.list.length
        })
        console.log(that.data.addressData)
      },
      fail (obj) {

      }
    })
  },
  provinceChange: function (e) {
    console.log(e)
    this.data.index = e.detail.value
    
  },
  editAddress: function (id) {
    console.log(id)
    wx.navigateTo({
      url: '/pages/address/address?shippingId' + id
    })
  }
})