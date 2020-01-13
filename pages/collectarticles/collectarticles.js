// pages/collectarticles/collectarticles.js

let host = require('../../utils/host.js');
let utils = require('../../utils/util.js');
let app = getApp();

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
                'Cookie': wx.getStorageSync('cookie') 
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
                        return;
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
        let index = e.currentTarget.dataset.current;
        let detailLink = encodeURIComponent(this.data.articles[index].link);
        wx.navigateTo({
          url: '../detail/detail' + '?url=' + detailLink
        });
    },

    longPressArticleItem: function(e) {
        let _this = this;
        let index = e.currentTarget.dataset.current;

        wx.showModal({
          content: '确定取消收藏此文章？',
          success: function(res) {
            if (res.confirm) {
                _this.unCollectArticle(index);
            } else {
                return;
            }
          }
        });
    },

    unCollectArticle: function(index) {
        let id = this.data.articles[index].id;
        let originId = this.data.articles[index].originId.length == 0 ? -1 : this.data.articles[index].originId;
        let _this = this;

        wx.request({
          url: host.BASE_URL + 'lg/uncollect/' + id + '/json',
          method: 'POST',
          header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cookie': wx.getStorageSync('cookie')
          },
          data: {
            originId: originId
          },
          success: function(res) {
              if (res.data.errorCode != 0) {
                  wx.showToast({
                    title: res.data.errorMsg,
                    icon: 'none'
                  });
              } else {
                  let articles = _this.data.articles;
                  articles.splice(index, 1);

                  _this.setData({
                      articles: articles
                  });
                  wx.showToast({
                    title: '取消收藏成功',
                    icon: 'none'
                  });
              }
          },
          fail: function() {
              wx.showToast({
                title: '网络异常，请稍后重试',
                icon: 'none'
              });
          }
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