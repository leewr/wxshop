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
    
  }
})