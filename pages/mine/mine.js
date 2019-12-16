// pages/mine/mine.js
Page({

    /**
     * Page initial data
     */
    data: {

    },

    clickMe: function() {
        console.log("点击了按钮");
        let url = encodeURIComponent("http://mp.weixin.qq.com/s?__biz=MzAxNzMxNzk5OQ==&mid=2649485865&idx=1&sn=6b464243657959bda265533863a1c495&chksm=83f83b29b48fb23fa05191ef86ead952576ab99c0e1a70e2ac4898cfb82c1964e289425d8f55&scene=38#wechat_redirect"); 
        wx.navigateTo({
            url: '../detail/detail' + '?url=' + url
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