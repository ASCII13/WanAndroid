// pages/scorelevel/scorelevel.js

const app = getApp();

Page({

    /**
     * Page initial data
     */
    data: {
        rankInfoList: [],
        pageNum: 1,
        requesting: false,
        end: false,
        showEmpty: false,
    },

    getList(type, currentPage) {
        this.setData({requesting: true});

        app.httpGet(`/coin/rank/${currentPage}/json`).then((res) => {
            this.setData({requesting: false});
            
            if (type === 'refresh') {
                this.setData({
                    rankInfoList: res.data.datas,
                    pageNum: currentPage + 1
                });
            } else {
                if (res.data.total > this.data.rankInfoList.length) {
                    this.setData({
                        rankInfoList: this.data.rankInfoList.concat(res.data.datas),
                        pageNum: currentPage + 1
                    });
                } else {
                    this.setData({end: true});
                }
            }
        });
    },

    more() {
        this.getList('more', this.data.pageNum);
    },

    refresh() {
        this.getList('refresh', 1);
    },

    getSelfInfo() {
        app.httpGet('/lg/coin/userinfo/json').then((res) => {
            this.setData({
                myself: res.data
            });
        });
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.getSelfInfo();
        this.getList('refresh', 1);
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