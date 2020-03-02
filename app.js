//app.js

App({
    onLaunch: function() {
        wx.getSystemInfo({
            success: (res) => {
                this.globalData.systemInfo = res;
                if (res.model.search('iphone X') !== -1) {
                    this.globalData.isIpohoneX = true;
                }
            }
        });
    },

    baseUrl: 'https://www.wanandroid.com',

    /**
	 * http请求封装
	 * @param method 请求方法类型
	 * @param url 请求路径
	 * @param data 请求参数
	 * @param loading 请求加载效果 {0: 正常加载, 1: 表单提交加载效果 }
	 * @param loadingMsg 请求提示信息
	 */
    httpBase: function(method, url, data, loading = false, loadingMsg) {
        let _this = this;
        let requestUrl = this.baseUrl + url;

        if (loading) {
            wx.showLoading({
                title: loadingMsg || '提交中...',
                mask: true
            });
        } else {
            wx.showNavigationBarLoading();
        }

        function request(resolve, reject) {
            wx.request({
                header: {
                    'Content-Type': 'application/json'
                },
                method: method,
                url: requestUrl,
                data: data,
                success: function(result) {
                    if (loading) {
                        wx.hideLoading({
                          complete: (res) => {},
                        });
                    } else {
                        wx.hideNavigationBarLoading({
                          complete: (res) => {},
                        });
                    }

                    let res = result.data || {};
                    let code = res.errorCode;

                    if (code !== 0) {
                        reject(res);
                        
                        if (res.message) {
                            wx.showToast({
                              title: res.message,
                              icon: 'none'
                            });
                        }
                    } else {
                        resolve(res);
                    }
                },
                fail: function(res) {
                    reject(res);

                    if (loading) {
                        wx.hideLoading({
                          complete: (res) => {},
                        });
                    } else {
                        wx.hideNavigationBarLoading({
                          complete: (res) => {},
                        });
                    }

                    wx.showToast({
                      title: '网络出错',
                      icon: 'none'
                    });
                }
            });
        }
        return new Promise(request);
    },

    httpGet: function(url, data, loading, loadingMsg) {
        return this.httpBase('GET', url, data, loading, loadingMsg);
    },

    httpPost: function() {
        return this.httpBase('POST', url, data, loading, loadingMsg);
    },

    globalData: {
        systemInfo: null,
        userInfo: null,
        isIpohoneX: false
    }
})