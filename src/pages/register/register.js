// pages/register/register.js

let host = require('../../utils/host.js');

Page({

    /**
     * Page initial data
     */
    data: {
        isAllowRegister: false,
        account: "",
        password: "",
        confirmPassword: ""

    },

    accountInput: function(e) {
        console.log(`账户名输入内容为：${e.detail.value}`);
        this.setData({
            account: e.detail.value
        });
        this.setAllowRegisterState();
    },

    passwordInput: function(e) {
        console.log(`密码输入内容为：${e.detail.value}`);
        this.setData({
            password: e.detail.value
        });
        this.setAllowRegisterState();
    },

    confirmPasswordInput: function(e) {
        console.log(`确认密码输入内容为：${e.detail.value}`);
        this.setData({
            confirmPassword: e.detail.value
        });
        this.setAllowRegisterState();
    },

    setAllowRegisterState: function() {
        if (this.data.account.length != 0 && this.data.password.length != 0 && this.data.confirmPassword.length != 0) {
            this.setData({
                isAllowRegister: true
            });
        } else {
            this.setData({
                isAllowRegister: false
            });
        }
    },

    login: function() {
        wx.navigateBack({
            delta: 1
        });
    },

    register: function() {
        let _this = this;
        wx.request({
            url: host.BASE_URL + 'user/register',
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                username: _this.data.account,
                password: _this.data.password,
                repassword: _this.data.confirmPassword
            },
            success: function(res) {
                if (res.data.errorCode != 0) {
                    wx.showToast({
                        title: res.data.errorMsg,
                        icon: 'none'
                    })
                } else {
                    console.log("注册成功");
                    if (res.statusCode == 200) {
                        if (res.header['Set-Cookie'] != '') {
                            wx.setStorageSync('Set-Cookie', res.header['Set-Cookie']);
                            console.log(`Set-Cookie值为: ${res.header['Set-Cookie']}`);
                        } else {
                            console.log('Set-Cookie为空');
                        }
                    } else {
                        wx.showToast({
                            title: '网络异常，请稍后再试',
                            icon: 'none'
                        });
                    }
                }
            },
            fail: function() {
                wx.showToast({
                    title: '网络异常，请稍后再试',
                    icon: 'none'
                });
            }
        });
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