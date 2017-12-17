var app = getApp();
const api = require('./utils/api.js');

App({
    onLaunch: function (options) {
        wx.login({
            success: function (res) {
                if (res.code) {
                    api.login({
                        data: {'code': res.code},
                        success: (res) => {
                            wx.setStorage({
                                key: "user_data",
                                data: res.data
                            })
                        }
                    })

                } else {
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
                    api.mod_user_info({
                        data: {
                            'user_id': value.data.user_id,
                            'user_info': JSON.stringify(res.userInfo),
                        },
                        success: (res) => {
                        }
                    })
                }

            }
        })
    },


})
