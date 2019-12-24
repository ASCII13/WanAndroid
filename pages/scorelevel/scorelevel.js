// pages/scorelevel/scorelevel.js

let host = require('../../utils/host.js');

Page({

    /**
     * Page initial data
     */
    data: {
        rankInfoList: [],
        scrollHeight: 0,
        pageNum: 1
    },

    getRankInfoList: function(pageNum) {
        let _this = this;
        wx.request({
            url: host.BASE_URL + 'coin/rank/' + pageNum + '/json',
            method: 'GET',
            success: function(res) {
                if (res.data.errorCode != 0) {
                    wx.showToast({
                        title: res.data.errorMsg,
                        icon: 'none'
                    });
                } else {
                    _this.setData({
                        rankInfoList: res.data.data.datas
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

    getWindowSize: function () {
        let _this = this;

        wx.getSystemInfo({
            success: function (res) {
                let clientHeight = res.windowHeight;
                let clientWidth = res.windowWidth;
                let rpxR = 750 / clientWidth;

                console.log("设备高度: ", clientHeight);
                console.log("设备宽度: ", clientWidth);

                let height = clientHeight * rpxR;
                let width = clientWidth * rpxR;

                console.log("高度: ", height);
                console.log("宽度: ", width);

                _this.setData({
                    scrollHeight: height - 150,  // 150为 scroll-view margin-top 高度
                });
            }
        });
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.getWindowSize();
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
        this.getRankInfoList(this.data.pageNum);
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