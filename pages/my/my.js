//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/api.js');
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        coin: 0,
    },
    onLoad: function () {
        var value = wx.getStorageSync('user_info')
        if (value) {
            this.setData({
                userInfo: value,
                hasUserInfo: true
            })
        }

    },
    onShow: function () {
        var that = this;
        var value = wx.getStorageSync('user_data')
        if (value) {
            api.get_user_coin({
                data: {
                    'user_id': value.data.user_id,
                },
                success: (res) => {
                    that.setData({
                        coin: res.data.data.coin_num,
                    })

                }
            })
        }
    },
    getUserInfo: function (e) {
        var that = this;
        wx.getUserInfo({
            success: function (res) {
                wx.setStorage({
                    key: "user_info",
                    data: res.userInfo
                })
                that.setData({
                    userInfo: e.detail.userInfo,
                    hasUserInfo: true
                })
                var value = wx.getStorageSync('user_data')
                if (value) {
                    api.mod_user_info({
                        data: {
                            'user_id': value.data.user_id,
                            'user_info': JSON.stringify(res.userInfo),
                        },
                        success: (res) => {
                        }
                    })
                }

            },
            fail: function (res) {
            }
        })
    }
})