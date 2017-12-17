Page({

    data: {
        list: [],
        choose: false,
    },
    onLoad: function (options) {
        this.setData({
            choose: options.choose,
        });
    },
    result: function (e) {
        var data = e.currentTarget.dataset.id
        if (this.data.choose) {
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]
            prevPage.setData({
                addr: data.address + data.place,
                info: data.name + "   " + data.phone,
                address_detail: e.currentTarget.dataset.id,
            })
            wx.navigateBack({
                delta: 1,
            })
        }
    },
    onShow: function () {
        var that = this;
        wx.getStorage({
            key: 'user_data',
            success: function (res) {
                wx.request({
                    url: "https://smallstrong.site/api/address_list?user_id=" + res.data.data.user_id,
                    method: "GET",
                    success: function (res) {
                        that.setData({list: res.data.data});
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
    },
    mod_address: function (e) {
    },

});
