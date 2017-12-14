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
        var user_data = wx.getStorageSync('user_data')
        if (user_data) {
            this.setData({
                coin: user_data.data.coin,
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
                    console.log(value)
                    api.mod_user_info({
                        data: {
                            'user_id': value.data.user_id,
                            'user_info': JSON.stringify(res.userInfo),
                        },
                        success: (res) => {
                            console.log(res.data)
                        }
                    })
                }

            },
            fail: function (res) {
                console.log('fail')
            }
        })
    }
})