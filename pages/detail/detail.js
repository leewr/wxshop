// var request = require('../../utils/request.js')
var apiData = require('../../api/detail.js');
var detailData = apiData.detail()
Page({
  data: {
  	detailData: detailData.data,
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    buynum: 1,
    cartbox: false
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
   	
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