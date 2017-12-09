// pages/vip/vip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [
      {
        text: "1￥=10积分",
        money:1,
      },
      {
        text: "5￥=55积分",
        money: 5,
      },
      {
        text: "10￥=110积分",
        money: 10,
      },
      {
        text: "20￥=230积分",
        money: 20,
      },
      {
        text: "50￥=600积分",
        money: 50,
      },
    ]
  }, 
  vip: function (e) {
    var money = e.currentTarget.dataset.money; //打印可以看到，此处已获取到了对应的id
    console.log(money)
    wx.getStorage({
      key: 'user_data',
      success: function (res) {
        wx.request({
          url: "https://smallstrong.site/api/add_coin",
          method: 'POST',
          data: {
            'user_id': res.data.data.user_id,
            'money': money,
            'openid': res.data.data.openid,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res)
            wx.requestPayment({
              'timeStamp': res.data.data.timeStamp+'',
              'nonceStr': res.data.data.nonceStr+'',
              'package': res.data.data.package,
              'signType': res.data.data.signType,
              'paySign': res.data.data.paySign,
              'success': function (res) {
                console.log(res);
              },
              'fail': function (res) {
                console.log('fail:' + JSON.stringify(res));
              }
            })
          },
          fail: function (err) {
            console.log(err)
          }
        })
      }
    })
    
  },

})