// pages/login/login.js

let host = require('../../utils/host.js');

Page({

    /**
     * Page initial data
     */
    data: {
        isAllowLogin: false,
        account: "",
        password: "",

    },

    register: function() {
        wx.navigateTo({
            url: '../register/register',
        })
    },

    login: function() {
        let _this = this;
        wx.request({
            url: host.BASE_URL + 'user/login',
            method: 'POST',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                username: _this.data.account,
                password: _this.data.password
            },
            success: function(res) {
                if (res.data.errorCode != 0) {
                    wx.showToast({
                        title: res.data.errorMsg,
                        icon: 'none'
                    });
                } else {
                    if (res.statusCode == 200) {
                        if (res.header['Set-Cookie'] != '') {
                            wx.setStorageSync('Set-Cookie', res.header['Set-Cookie']);
                            wx.setStorageSync('account', _this.data.account);
                            wx.setStorageSync('password', _this.data.password);
                            console.log('登录成功');

                            let pages = getCurrentPages();
                            let lastPage = pages[pages.length - 2];
                            lastPage.setData({
                                isLogin: true,
                                nickname: res.data.data.nickname
                            });
                            wx.navigateBack({
                                delta: 1
                            });

                        } else {
                            console.log('Set-Cookie为空');
                        }
                    } else {
                        wx.showToast({
                            title: '网络异常，请稍后重试',
                            icon: 'none'
                        });
                    }
                }
            },
            fail: function() {
                wx.showToast({
                    title: '网络异常，请稍后重试',
                    icon: 'none'
                });
            }
        });
    },

    setAllowLoginState: function() { 
        if (this.data.account.length != 0 && this.data.password.length != 0) {
            this.setData({
                isAllowLogin: true
            });
        } else {
            console.log("账号密码不能为空");
            this.setData({
                isAllowLogin: false
            });
        }
    },

    accountInput: function(e) {
        console.log(`输入的账户名为：${e.detail.value}`);
        this.setData({
            account: e.detail.value
        });
        this.setAllowLoginState();
    },

    passwordInput: function(e) {
        console.log(`输入的密码为:${e.detail.value}`);
        this.setData({
            password: e.detail.value
        });
        this.setAllowLoginState();
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})