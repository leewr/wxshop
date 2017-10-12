var app = getApp()
var apiData = require('../../api/detail.js');
var detailData = apiData.detail()
Page({
    data: {
        id: '',
        userId: 0,
        receiverName: '',
        receiverPhone: '',
        receiverMobile: '',
        receiverProvince: '',
        receiverCity: '',
        receiverAddress: '',
        receiverZip: '',
        provinceData: ['北京', '天津', '合肥'],
        cityIndex: 0,
        cityData: ['長沙', '唱得']
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function(option) {
        console.log(option)
        var that = this
        if (option.id) {
            that.setData({
                id: option.id
            })
            wx.request({
                url: 'http://47.90.38.178:8080/wx_shop_test/shipping/select.do',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                data: {
                    shippingId: that.data.id
                },
                success: function(obj) {
                    console.log(obj.data.data.receiverName)
                    console.log(obj)
                    if (obj.data.status == 0) {
                        that.setData({
                          userId: obj.data.data.userId,
                          receiverName: obj.data.data.receiverName,
                          receiverPhone: obj.data.data.receiverPhone,
                          receiverMobile: obj.data.data.receiverMobile,
                          receiverProvince: obj.data.data.receiverProvince,
                          receiverCity: obj.data.data.receiverCity,
                          receiverAddress: obj.data.data.receiverAddress,
                          receiverZip: obj.data.data.receiverZip
                        })
                    } else {
                        console.log('error')
                    }
                },
                fail(obj) {

                }
            })
        }
    },
    provinceChange: function(e) {
        console.log(e)
        this.data.index = e.detail.value
    },
    addaddress: function() {
        var that = this
        var apiUrl = ''
        if (!this.data.id) {
          apiUrl = 'http://47.90.38.178:8080/wx_shop_test/shipping/add.do'
        } else {
          apiUrl = 'http://47.90.38.178:8080/wx_shop_test/shipping/update.do'
        }
        //添加收货地址
        if (that.data.receiverName == '') {
            wx.showModal({
                content: '请填写收货人姓名',
                showCancel: false
            })
            return false
        }
        if (that.data.receiverPhone == '') {
            wx.showModal({
                content: '请填写收货人联系电话',
                showCancel: false
            })
            return false
        }
        wx.request({
            url: apiUrl,
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            data: {
                userId: that.data.userId,
                receiverName: that.data.receiverName,
                receiverPhone: that.data.receiverPhone,
                receiverMobile: that.data.receiverPhone,
                receiverProvince: that.data.receiverProvince,
                receiverCity: that.data.receiverCity,
                receiverAddress: that.data.receiverAddress,
                receiverZip: that.data.receiverZip
            },
            success: function(obj) {
                console.log(obj.data)
                console.log(obj)
                if (obj.data.status == 0) {
                    console.log('come')
                    wx.navigateBack({
                        delta: 1
                    })
                } else {
                    console.log('error')
                }
            },
            fail(obj) {

            }
        })
    },
    inputName: function(e) {
        console.log(e)
        this.setData({
            receiverName: e.detail.value
        })
    },
    inputPhone: function(e) {
        this.setData({
            receiverPhone: e.detail.value
        })
    },
    inputAddress: function(e) {
        this.setData({
            receiverAddress: e.detail.value
        })
    },
    inputZip: function(e) {
        this.setData({
            receiverZip: e.detail.value
        })
    }

})