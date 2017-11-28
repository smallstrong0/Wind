var util = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: ["A4黑白打印 (每面0.1元)", "A4彩色打印 (每面0.5元)", "A3黑白打印 (每面0.2元)", "A3彩色打印 (每面1元)", "扫描 (每面0.1元)"],
    categoryIndex: 0,

    way: ["单面", "正反面"],
    wayIndex: 0,

    time_list: ["尽快送达"],
    timeIndex: 0,
    
    address_detail:"",
    info:"",
    addr:"",
    pages:0,
    coin:0,
    remark:'',
  },

  get_remark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  get_pages: function (e) {
    var index = this.data.categoryIndex
    var coin = 1
    if (index == 0){
      coin = 1
    } else if (index == 1){
      coin = 5
    } else if (index == 2) {
      coin = 2
    } else if (index == 3) {
      coin = 10
    } else if (index == 4) {
      coin = 1
    }
    this.setData({
      pages: e.detail.value,
      coin: e.detail.value * coin
    })
  },

  choose_addr: function () {
    wx.navigateTo({
      url: '../address_list/address_list?choose=true',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      timeIndex: e.detail.value
    })
  },

  bindCategoryChange: function (e) {
    this.setData({
      categoryIndex: e.detail.value
    })
  },

  bindWayChange: function (e) {
    this.setData({
      wayIndex: e.detail.value
    })
  },

  openConfirm: function () {
    var that = this;
    var address_detail = that.data.address_detail
    if (address_detail != '' && that.data.pages != 0) {
      wx.showModal({
        title: '圣旨',
        content: '君上，请三思后提交',
        confirmText: "下诏书",
        cancelText: "再瞅瞅",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            if (address_detail != '' && that.data.pages != 0) {
              wx.getStorage({
                key: 'user_data',
                success: function (res) {
                  wx.request({
                    url: "https://smallstrong.site/api/commit_order",
                    method: "POST",
                    data: {
                      'user_id': res.data.data.user_id,
                      'address_id': that.data.address_detail.address_id,
                      'address': that.data.address_detail.address,
                      'place': that.data.address_detail.place,
                      'name': that.data.address_detail.name,
                      'phone': that.data.address_detail.phone,
                      'qq': that.data.address_detail.qq,
                      'we_chat': that.data.address_detail.we_chat,
                      'remark': that.data.remark,
                      'category': that.data.category[that.data.categoryIndex],
                      'way': that.data.way[that.data.wayIndex],
                      'time_stamp': that.data.time_list[that.data.timeIndex],
                      'page_num': that.data.pages,
                      'coin': that.data.coin,
                    },
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) {
                      console.log(res.data)
                      wx.showToast({
                        title: '已完成',
                        icon: 'success',
                        duration: 3000
                      });
                      
                    }
                  });
                },
             })
            }
            console.log('任性提交')
          } else {
            console.log('再瞅瞅')
          }
      }
    });
    }else{
      wx.showModal({
        content: '请输入收货人信息及打印页数',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
  },

})