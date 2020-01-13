// pages/personalinfosetting/personalinfosetting.js

let host = require('../../utils/host.js');
let utils = require('../../utils/util.js');

Page({

    /**
     * Page initial data
     */
    data: {
        methodList: []

    },

    getMethodList: function() {
        this.setData({
            methodList: [
                {   
                    name: "修改密码",
                    src: "../../images/password.png"
                },
                {
                    name: "修改昵称",
                    src: "../../images/nickname.png"
                },
                {
                    name: "绑定邮箱",
                    src: "../../images/email.png"
                }
            ]
        });
    },

    clickFeature: function() {
        wx.showToast({
            title: '功能开发中，敬请期待',
            icon: 'none'
        });
    },

    logout: function() {
        wx.request({
            url: host.BASE_URL + 'user/logout/json',
            method: 'GET',
            success: function(res) {
                if (res.data.errorCode != 0) {
                    wx.showToast({
                        title: res.data.errorMsg,
                        icon: 'none'
                    });
                } else {
                    utils.clearLoginInfo();
                    wx.navigateBack({
                       delta: 1 
                    });
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
        this.getMethodList();
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