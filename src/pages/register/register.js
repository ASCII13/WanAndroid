// pages/register/register.js

import { register, signIn } from "@/api/auth";

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

    register() {
        const {
            account,
            password,
            confirmPassword
        } = this.data;
        register(account, password, confirmPassword).then(() => {
            return signIn(account, password).then(() => {
                wx.setStorageSync('account', account);
                wx.setStorageSync('password', password);
                wx.navigateBack({
                    delta: 2,
                });
            });
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