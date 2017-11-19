//app.js
var app = getApp();
var baseURL = "https://smallstrong.site/api/";
App({
  onLaunch: function (options) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: baseURL+'login?code='+res.code,
            success: function (res) {
              console.log(res.data)
              wx.setStorage({
                key: "user_data",
                data: res.data
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
     
    });

    wx.getUserInfo({
      success: function (res) {
        wx.setStorage({
          key: "user_info",
          data: res.userInfo
        })
        var value = wx.getStorageSync('user_data')
          if (value) {
            console.log(value)
          //发起网络请求
          wx.request({
            url: baseURL + 'mod_user_info?user_id=' + value.data.user_id + '&user_info=' + JSON.stringify(res.userInfo),
            success: function (res) {
              console.log(res.data)
            }
          })
          }
         
      }
    })
  },

  
  
})
