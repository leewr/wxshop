var app = getApp()
var apiData = require('../../api/detail.js');
var detailData = apiData.detail()
Page({
  data: {
    detailData: detailData.data,
    userInfo: {}
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
    wx.request({
      url: 'http://47.90.38.178:8080/wx_shop_test/order/list.do',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        pageSize: 10,
        pageNum: 1
      },
      success: function (res) {
        console.log(res)
      }
    })
  }
})