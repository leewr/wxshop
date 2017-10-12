Page({
  data: {
  	detailData: '',
    id: '',
    imgUrls: '',
    buynum: 1
  },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
   	console.log(options)
    this.setData({
      id: options.id
    })
    // 获取详细产品数据
    wx.request({
      url: 'http://47.90.38.178:8080/wx_shop_test/product/detail.do',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        productId: options.id
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
  preventDefaultEvent: function (e) {
  	// console.log(e)
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  buynow: function () {
  	this.showCart()
  },
  showCart: function(e){
  	this.setData({
  		cartbox: true
  	})
  },
  hideCart: function(e) {
  	this.setData({
  		cartbox: false
  	})
  },
  plusNum: function () {
  	console.log(11)
  	let curNum = this.data.buynum
  	curNum++
  	this.setData({
  		buynum: curNum
  	})
  },
  reduceNum: function () {
  	let curNum = this.data.buynum
  	curNum--
  	this.setData({
  		buynum: curNum
  	})
  }
})