// pages/collectarticles/collectarticles.js

let host = require('../../utils/host.js');

Page({

    /**
     * Page initial data
     */
    data: {
        articles: [],
        pageNum: 0,
        total: 0,
        size: 0    // 每页数量

    },

    getArticles: function(pageNum) {
        let _this = this;
        wx.request({
            url: host.BASE_URL + 'lg/collect/list/'+ pageNum + '/json',
            method: 'GET',
            header: {
                'Cookie': wx.getStorageSync('Set-Cookie') 
            },
            success: function(res) {
                if (res.data.errorCode != 0) {
                    wx.showToast({
                        title: res.data.errorMsg,
                        icon: 'none'
                    });
                } else {
                    let oldData = _this.data.articles;
                    let newData = res.data.data.datas;

                    _this.setData({
                        articles: oldData.concat(newData),
                        total: res.data.data.total,
                        size: res.data.data.size
                    });
                }
            },
            fail: function() {
                wx.showToast({
                    title: '网络异常，请稍后再试',
                    icon: 'none'
                })
            }
        })
    },

    showArticleDetail: function(e) {
        console.log(`点击的收藏文章地址为${e.currentTarget.dataset.current}`);

        let detailLink = encodeURIComponent(e.currentTarget.dataset.current);
        wx.navigateTo({
            url: '../detail/detail' + '?url=' + detailLink
        });
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.setData({
            articles: [],
            pageNum: 0,
            total: 0,
            size: 0
        });
        this.getArticles(this.data.pageNum);
        wx.stopPullDownRefresh();
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
        this.onLoad();
    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {
        console.log("触发上拉加载");

        if (this.data.size * this.data.pageNum < this.data.total) {
            let pageNum = this.data.pageNum + 1;
            this.setData({
                pageNum: pageNum
            });
            this.getArticles(this.data.pageNum);
        } else {
            wx.showToast({
                title: '无更多数据',
                icon: 'none'
            });
        }
    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})