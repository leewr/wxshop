//index.js
//获取应用实例
var app = getApp()
console.log(app)
Page({
  data: {
    userInfo: {},
    indexList: ''
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
    /*app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })*/
    // 登录
    wx.login({
      success: function(res) {
        console.log(res.code)
        if (res.code) {
          //登录
          wx.request({
            url: 'http://47.90.38.178:8080/wx_shop_test/user/login.do',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            data: {
              code: res.code
            },
            success: function (res) {
              if (res.data.status === 0) {
                // app.globalData.sessionid = res.data.data
                that.getIndexPro()
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    
  },
  getIndexPro () {
    var that = this
    // 获取分类数据
    wx.request({
      url: 'http://47.90.38.178:8080/wx_shop_test/product/list.do',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        categoryId: '100001'
      },
      success: function (obj) {
        console.log(obj.data.data.list)
        that.setData({
          indexList:obj.data.data.list
        })
        console.log(that.data.indexList.length)
      },
      fail (obj) {

      }
    })
  }
})
