Page({
    data: {
        list: [],
    },
    onShow: function () {
        var that = this;
        wx.getStorage({
            key: 'user_data',
            success: function (res) {
                wx.request({
                    url: "https://smallstrong.site/api/list_order?user_id=" + res.data.data.user_id,
                    method: "GET",
                    success: function (res) {
                        that.setData({list: res.data.data});
                    }
                });
            },
        })
    },
});
