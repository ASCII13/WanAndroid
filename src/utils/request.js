const baseUrl = 'https://www.wanandroid.com';

function httpBase(method, requestUrl, data) {
    const url = baseUrl + requestUrl;
    const cookie = wx.getStorageSync('cookie');

    let header = {};

    if (method === 'POST') {
        header['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    
    if (cookie) {
        header['Cookie'] = cookie
    }

    function request(resolve, reject) {
        wx.request({
            header,
            method,
            url,
            data,
            success: function(response) {
                const res = response.data || {};
                if (res.errorCode !== 0) {
                    reject(res);
                    if (res.errorMsg) {
                        wx.showToast({
                            title: res.errMsg,
                            icon: 'none'
                        });
                    }
                } else {
                    const searchResult = url.indexOf('login');
                    if (searchResult !== -1) {
                        wx.setStorageSync('cookie', response.header['Set-Cookie']);
                    }
                    resolve(res);
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
