var sendRequest = function sendRequest(url, method, data, header) {
  if (arguments[2] === undefined) {
    var data = {}
  }
  if (arguments[3] === undefined) {
    var header = {}
  }
  var promise = new Promise(function (resolve, reject) {
    // 修改请求头为application/x-www-form-urlencoded
    if (!('Content-Type' in header)) {
      header['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    wx.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: resolve,
      fail: reject
    })
  });
  return promise;
};

module.exports.sendRequest = sendRequest