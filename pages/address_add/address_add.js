// pages/commit/commit.js
Page({
  data: {
    name:'',
    phone:'',
    qq:'',
    we_chat:'',
    address:'',
    place:'',
  },

  get_name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  get_phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  get_qq: function (e) {
    this.setData({
      qq: e.detail.value
    })
  },
  get_we_chat: function (e) {
    this.setData({
      we_chat: e.detail.value
    })
  },
  get_address: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  get_place: function (e) {
    this.setData({
      place: e.detail.value
    })
  },
  onLoad: function (options) {
    
  },

  add_address: function () {
    var that = this;
    if (that.data.name != '' && that.data.phone != '' && that.data.qq != ''
       && that.data.address != '' && that.data.place != ''){
    wx.getStorage({
      key: 'user_data',
      success: function (res) {
        wx.request({
          url: "https://smallstrong.site/api/address_add",
          method: "POST",
          data: {
            'name': that.data.name,
            'phone': that.data.phone,
            'qq': that.data.qq,
            'we_chat': that.data.we_chat,
            'address': that.data.address,
            'place': that.data.place,
            'user_id': res.data.data.user_id,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res.data)
            wx.navigateBack({
              delta: 1
            })
          }
        });
      },
      openLoading: function () {
        wx.showToast({
          title: '数据加载中',
          icon: 'loading',
          duration: 3000
        });       
      },
    })
    }
    
  },
})