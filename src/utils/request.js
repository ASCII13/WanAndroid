const baseUrl = 'https://www.wanandroid.com';

function httpBase(method, requestUrl, data) {
    const url = baseUrl + requestUrl;
    const cookie = wx.getStorageSync('cookie');

    function request(resolve, reject) {
        wx.request({
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': cookie
            },
            method,
            url,
            data,
            success: function(response) {
                let res = response.data || {};
                if (res.errorCode !== 0) {
                    reject(res);
                    if (res.errorMsg) {
                        wx.showToast({
                            title: res.errMsg,
                            icon: 'none'
                        });
                    }
                } else {
                    resolve(res)
                }
            },
            fail: function(error) {
                reject(error);
                wx.showToast({
                    title: '网络异常，请稍后再试',
                    icon: 'none'
                });
            }

        });
    }
    return new Promise(request);
}

export function httpGet(url, data) {
    return httpBase('GET', url, data);
}

export function httpPost(url, data) {
    return httpBase('POST', url, data);
}
