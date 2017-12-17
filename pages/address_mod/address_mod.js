// pages/commit/commit.js
Page({
    data: {
        name: '',
        phone: '',
        qq: '',
        we_chat: '',
        address: '',
        place: '',
        address_id: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            name: options.name,
            phone: options.phone,
            qq: options.qq,
            we_chat: options.we_chat,
            address: options.address,
            place: options.place,
            address_id: options.address_id,
        });
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
    openLoading: function () {
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 3000
        });
    },
    delete_address: function () {
        wx.request({
            url: "https://smallstrong.site/api/address_del?address_id=" + this.data.address_id,
            method: "GET",
            success: function (res) {
                wx.navigateBack({
                    delta: 1
                })
            }
        });
    },
    mod_address: function () {
        var that = this;
        if (that.data.name != '' && that.data.phone != '' && that.data.qq != ''
            && that.data.address != '' && that.data.place != '' && that.data.address_id != '') {
            wx.getStorage({
                key: 'user_data',
                success: function (res) {
                    wx.request({
                        url: "https://smallstrong.site/api/address_mod",
                        method: "POST",
                        data: {
                            'name': that.data.name,
                            'phone': that.data.phone,
                            'qq': that.data.qq,
                            'we_chat': that.data.we_chat,
                            'address': that.data.address,
                            'place': that.data.place,
                            'user_id': res.data.data.user_id,
                            'address_id': that.data.address_id,
                        },
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        success: function (res) {
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