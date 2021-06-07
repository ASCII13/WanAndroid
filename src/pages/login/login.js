// pages/login/login.js

import { signIn } from '@/api/auth';

Page({

    /**
     * Page initial data
     */
    data: {
        isAllowLogin: false,
        account: "",
        password: "",
        isShowPassword: false,
        isShowAccountClearBtn: false,
        isShowPasswordClearBtnAndShowPasswordBtn: false
    },

    register: function() {
        wx.navigateTo({
            url: '../register/register',
        })
    },

    login() {
        const { account, password } = this.data;
        signIn(account, password).then(res => {
            wx.setStorageSync('account', account);
            wx.setStorageSync('password', password);
            wx.navigateBack({
              delta: 1,
            });
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

        let _this = this;

        this.setData({
            account: e.detail.value
        });

        if (e.detail.value.length != 0) {
            _this.setData({
                isShowAccountClearBtn: true
            });
        } else {
            _this.setData({
                isShowAccountClearBtn: false
            });
        }

        this.setAllowLoginState();
    },

    passwordInput: function(e) {
        console.log(`输入的密码为:${e.detail.value}`);

        let _this = this;

        this.setData({
            password: e.detail.value,
        });

        if (e.detail.value.length != 0) {
            _this.setData({
                isShowPasswordClearBtnAndShowPasswordBtn: true
            });
        } else {
            _this.setData({
                isShowPasswordClearBtnAndShowPasswordBtn: false
            });
        }

        this.setAllowLoginState();
    },

    clearAccountContent: function() {
        this.setData({
            account: "",
            isShowAccountClearBtn: false
        });
        this.setAllowLoginState();
    },

    clearPasswordContent: function() {
        this.setData({
            password: "",
            isShowPasswordClearBtnAndShowPasswordBtn: false
        });
        this.setAllowLoginState();
    },

    showPassword: function() {
        let isShowPassword = !this.data.isShowPassword;
        this.setData({
            isShowPassword: isShowPassword
        });
    },

    accountFocus: function() {
        let _this = this;

        this.setData({
            isShowPasswordClearBtnAndShowPasswordBtn: false
        });

        if (this.data.account.length != 0) {
            _this.setData({
                isShowAccountClearBtn: true,
            });
        } else {
            _this.setData({
                isShowAccountClearBtn: false,
            });
        }
    },

    passwordFocus: function() {
        let _this = this;

        this.setData({
            isShowAccountClearBtn: false
        });

        if (this.data.password.length != 0) {
            _this.setData({
                isShowPasswordClearBtnAndShowPasswordBtn: true
            });
        } else {
            _this.setData({
                isShowPasswordClearBtnAndShowPasswordBtn: false
            })
        }
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