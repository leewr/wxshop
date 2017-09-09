var app = getApp()
var apiData = require('../../api/detail.js');
var detailData = apiData.detail()
Page({
  data: {
    index: 0,
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
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      if(userInfo.gender == 1){
        userInfo.gender = '男'
      }
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  provinceChange: function (e) {
    console.log(e)
    this.data.index = e.detail.value
  }
})