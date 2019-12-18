// pages/login/login.js
Page({

    /**
     * Page initial data
     */
    data: {
        isAllowLogin: false

    },

    register: function() {
        wx.showToast({
            title: '点击了注册按钮',
            icon: 'none'
        })
    },

    login: function() {
        wx.showToast({
            title: '点击了登录按钮',
            icon: 'none'
        })
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