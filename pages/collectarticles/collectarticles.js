// pages/collectarticles/collectarticles.js

let host = require('../../utils/host.js');

Page({

    /**
     * Page initial data
     */
    data: {
        articles: [],
        pageNum: 0,
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
                    if (res.data.data.total > oldData.length) {
                        _this.setData({
                            articles: oldData.concat(newData),
                            pageNum: pageNum
                        });
                    } else if (oldData.length == 0 && newData.length == 0) {
                        return
                    } else {
                        wx.showToast({
                            title: '无更多数据',
                            icon: 'none'
                          });
                    }
                }
            },
            fail: function() {
                wx.showToast({
                    title: '网络异常，请稍后再试',
                    icon: 'none'
                })
            }
        })
        wx.stopPullDownRefresh();
    },

    clickArticleItem: function(e) {
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
        this.getArticles(this.data.pageNum);
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
        this.setData({
            pageNum: 0,
            articles: []
        });
        this.getArticles(this.data.pageNum);
    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {
        console.log("触发上拉加载");
        let pageNum = this.data.pageNum + 1;
        this.getArticles(pageNum);
    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})