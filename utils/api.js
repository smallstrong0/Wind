const apiURL = 'https://smallstrong.site/api';

const wxRequest = (params, url) => {
    wx.request({
        url: url,
        method: params.method || 'GET',
        data: params.data || {},
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        success(res) {
            if (params.success) {
                params.success(res);
            }
        },
        fail(res) {
            if (params.fail) {
                params.fail(res);
            }
        },
        complete(res) {
            if (params.complete) {
                params.complete(res);
            }
        },
    });
};

const login = (params) => {
    wxRequest(params, `${apiURL}/login`);
};

const mod_user_info = (params) => {
    wxRequest(params, `${apiURL}/mod_user_info`);
};
const get_user_coin = (params) => {
    wxRequest(params, `${apiURL}/get_user_coin`);
};


module.exports = {
    login,
    mod_user_info,
    get_user_coin,
};
