//index.js
//获取应用实例
const app = getApp()
var baseURL = "https://smallstrong.site/api/";
Page({
    data: {
        userInfo: {},
        hasUserInfo: false
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
    getUserInfo: function (e) {
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
        wx.setStorage({
            key: "user_info",
            data: e.detail.userInfo
        })

        var value = wx.getStorageSync('user_data')
        if (value) {
            console.log(value)
            //发起网络请求
            wx.request({
                url: baseURL + 'mod_user_info?user_id=' + value.data.user_id + '&user_info=' + JSON.stringify(e.detail.userInfo),
                success: function (res) {
                    console.log(res.data)
                }
            })
        }
    }
})