var app = getApp()
var apiData = require('../../api/detail.js');
var detailData = apiData.detail()
Page({
  data: {
    detailData: detailData.data,
    userInfo: {},
    shippingId: 0,
    addressChoice: false,
    addressLength: 0,
    address: {
      userName: app.globalData.address.userName,
      postalCode: app.globalData.address.postalCode,
      provinceName: app.globalData.address.provinceName,
      cityName: app.globalData.address.cityName,
      detailInfo: app.globalData.address.detailInfo,
      nationalCode: app.globalData.address.nationalCode,
      telNumber: app.globalData.address.telNumber
    }
  },
  /*//事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },*/
  onLoad: function (options) {
    console.log('settle')
    var that = this

    console.log(options)
    // 订单页产品信息
    // 获取详细产品数据
    wx.request({
      url: 'http://47.90.38.178:8080/wx_shop_test/product/detail.do',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        productId: options.productId
      },
      success: function (obj) {
        console.log(obj)
        if (obj.data.status === 0) {
          that.setData({
            imgUrls: obj.data.data.subImages.split(',')
          })
          console.log(obj.data.data.detail)
          obj.data.data.detail = obj.data.data.detail.replace(/width=\"?(\d*)\"?/g,"width='100%'")
          obj.data.data.detail = obj.data.data.detail.replace(/height=\"?(\d*)\"?/g,"height='auto'")
          that.setData({
            detailData: obj.data.data
          })
          console.log(detailData)
        }
      },
      fail (obj) {

      }
    })
    
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
        console.log(obj.data.data.list.length)
        if (obj.data.data.list.length > 1) {
          that.setData({
            addressLength: obj.data.data.list.length
          })
        } else {
          that.setData({
            addressLength: 0
          })
        }
      },
      fail (obj) {

      }
    })
  },
  createOrder () {
    if (!this.data.addressChoice) {
      wx.showModal({
        content: '请填写收货地址',
        showCancel: false
      })
      return false
    }
    // 创建订单
    wx.request({
      url: 'http://47.90.38.178:8080/wx_shop_test/product/detail.do',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        shippingId: options.id
      },
      success: function (obj) {
        console.log(obj)
        if (obj.data.status === 0) {
          that.setData({
            imgUrls: obj.data.data.subImages.split(',')
          })
          console.log(obj.data.data.detail)
          obj.data.data.detail = obj.data.data.detail.replace(/width=\"?(\d*)\"?/g,"width='100%'")
          obj.data.data.detail = obj.data.data.detail.replace(/height=\"?(\d*)\"?/g,"height='auto'")
          that.setData({
            detailData: obj.data.data
          })
          that.data
        }
      },
      fail (obj) {

      }
    })
  },
  addressjudge () {
    var that = this
    if (!this.data.addressLength) {
      // 发起授权
      console.log(1)
      wx.getSetting({
        success(res) {
            console.log(res)
            if (!res.authSetting['scope.address']) {
                wx.authorize({
                    scope: 'scope.address',
                    success() {
                        // 选择收货地址
                        wx.chooseAddress({
                          success: function (res) {
                            wx.setStorageSync('address', res)
                            /* app.globalData.address.userName = res.userName
                            app.globalData.address.postalCode = res.postalCode
                            app.globalData.address.provinceName = res.provinceName
                            app.globalData.address.cityName = res.cityName
                            app.globalData.address.countyName = res.countyName
                            app.globalData.address.detailInfo = res.detailInfo
                            app.globalData.address.nationalCode = res.nationalCode
                            app.globalData.address.telNumber = res.telNumber
                            console.log(res.userName)
                            console.log(res.postalCode)
                            console.log(res.provinceName)
                            console.log(res.cityName)
                            console.log(res.countyName)
                            console.log(res.detailInfo)
                            console.log(res.nationalCode)
                            console.log(res.telNumber)*/
                          }
                        })
                    },
                    fail() {
                      // 授权失败调用自定义
                      wx.navigateTo({
                        url: '/pages/address/address'
                      })
                    }
                })
            }
        },
        fail(res) {
          console.log(res)
           wx.authorize({
              scope: 'scope.address',
              success() {
                  // 选择收货地址
                  wx.chooseAddress({
                    success: function (res) {
                      console.log(res.userName)
                      console.log(res.postalCode)
                      console.log(res.provinceName)
                      console.log(res.cityName)
                      console.log(res.countyName)
                      console.log(res.detailInfo)
                      console.log(res.nationalCode)
                      console.log(res.telNumber)
                    }
                  })
              },
              fail() {
                // 授权失败调用自定义
                wx.navigateTo({
                  url: '/pages/address/address'
                })
              }
          })
        }
    })      
    } else {
      wx.navigateTo({
        url: '/pages/addresslist/addresslist'
      })
    }
  }
})