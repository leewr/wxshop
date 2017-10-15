//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
   /* wx.login({
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
                this.globalData.sessionid = res.data.data
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });*/
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    sessionid: null
  }
})
