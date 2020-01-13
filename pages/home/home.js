// pages/home/home.js

let host = require('../../utils/host.js');
let utils = require('../../utils/util.js');

Page({

    /**
     * Page initial data
     */
    data: {
        bannerList: [],
        topArticleList: [],
        articleList: [],
        pageNum: 0,
        isLogin: false
    },

    getBanner: function() {
        let _this = this;
        wx.request({
            url: host.BASE_URL + 'banner/json',
            method: 'GET',
            success: function(res) {
                if (res.data.errorCode != 0) {
                    wx.showToast({
                        title: res.data.errorMsg,
                        icon: 'none'
                    });
                } else {
                    _this.setData({
                        bannerList: res.data.data
                    });
                }
            },
            fail: function() {
                console.log('网络异常');
            }
        })
    },

    clickBannerItem: function(e) {
        let url = encodeURIComponent(e.currentTarget.dataset.current);
        wx.navigateTo({
            url: '../detail/detail' + '?url=' + url
        });
    },

    getTopArticleList: function() {
        let _this = this;
        if (!utils.isLogin()) {
            console.log('获取置顶文章，未携带cookie');
            wx.request({
                url: host.BASE_URL + 'article/top/json',
                method: 'GET',
                success: function (res) {
                    if (res.data.errorCode != 0) {
                        wx.showToast({
                            title: res.data.errorMsg,
                            icon: 'none'
                        });
                    } else {
                        _this.setData({
                            topArticleList: res.data.data
                        });
                    }
                },
                fail: function () {
                    console.log('网络异常');
                }
            });
        } else {
            console.log('获取置顶文章，携带cookie');
            wx.request({
                url: host.BASE_URL + 'article/top/json',
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
                        _this.setData({
                            topArticleList: res.data.data
                        });
                    }
                },
                fail: function() {
                    console.log('网络异常');
                }
            });
        }
    },

    getArticleList: function(pageNum) {
        console.log(`pageNum是${pageNum}`);
        let _this = this;
        if (!utils.isLogin()) {
            console.log('获取文章，未携带cookie');
            wx.request({
                url: host.BASE_URL + 'article/list/' + pageNum + '/json',
                method: 'GET',
                success: function (res) {
                    if (res.data.errorCode != 0) {
                        wx.showToast({
                            title: res.data.errorMsg,
                            icon: 'none'
                        });
                    } else {
                        let oldData = _this.data.articleList;
                        let newData = res.data.data.datas;
                        if (typeof(newData) == 'undefined' || newData == null || newData.length == 0) {
                            wx.showToast({
                                title: '无更多数据',
                                icon: 'none'
                              });
                        } else {
                            _this.setData({
                                articleList: oldData.concat(newData),
                                pageNum: pageNum
                            });
                        }
                    }
                },
                fail: function () {
                    console.log('网络异常');
                }
            });
        } else {
            console.log('获取文章，携带cookie');
            wx.request({
                url: host.BASE_URL + 'article/list/' + pageNum + '/json',
                method: 'GET',
                header: {
                    'Cookie': wx.getStorageSync('cookie')
                },
                success: function (res) {
                    if (res.data.errorCode != 0) {
                        wx.showToast({
                            title: res.data.errorMsg,
                            icon: 'none'
                        });
                    } else {
                        let oldData = _this.data.articleList;
                        let newData = res.data.data.datas;
                        if (typeof(newData) == 'undefined' || newData == null || newData.length == 0) {
                            wx.showToast({
                                title: '无更多数据',
                                icon: 'none'
                              });
                        } else {    
                            _this.setData({
                                articleList: oldData.concat(newData),
                                pageNum: pageNum
                            });
                        }
                    }
                },
                fail: function () {
                    console.log('网络异常');
                }
            });
        }    
    },

    clicktopArticleItem: function(e) {
        let link = encodeURIComponent(e.currentTarget.dataset.link);
        wx.navigateTo({
            url: '../detail/detail' + '?url=' + link,
        });
    },

    clickArticleItem: function(e) {
        let link = encodeURIComponent(e.currentTarget.dataset.link);
        wx.navigateTo({
            url: '../detail/detail' + '?url=' + link,
        })
    },

    clickTopArticleCollect: function(e) {
        if (utils.isLogin()) {
            let _this = this;
            let index = e.currentTarget.dataset.index;
            let id = _this.data.topArticleList[index].id;

            if (_this.data.topArticleList[index].collect) {
                wx.request({
                    url: host.BASE_URL + 'lg/uncollect_originId/' + id + '/json',
                    method: 'POST',
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
                            _this.data.topArticleList[index].collect = false;
                            _this.setData({
                                topArticleList: _this.data.topArticleList
                            });
                            wx.showToast({
                                title: '已取消收藏',
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
                })
            } else {
                wx.request({
                    url: host.BASE_URL + 'lg/collect/' + id + '/json',
                    method: 'POST',
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
                            _this.data.topArticleList[index].collect = true;
                            _this.setData({
                                topArticleList: _this.data.topArticleList
                            });
                            wx.showToast({
                                title: '已成功收藏',
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
                })
            }
        } else {
            wx.navigateTo({
              url: '../login/login',
            });
        }
    },

    clickArticleCollect: function(e) {
        if (utils.isLogin()) {     
            let _this = this;
            let index = e.currentTarget.dataset.index;
            let id = _this.data.articleList[index].id;
    
            if (_this.data.articleList[index].collect) {
                _this.uncollectArticle(id, index);
            } else {
                _this.collectArticle(id, index);
            }
        } else {
            wx.navigateTo({
              url: '../login/login',
            });
        }
    },

    collectArticle: function(id, index) {
        let _this = this;
        wx.request({
            url: host.BASE_URL + 'lg/collect/' + id + '/json',
            method: 'POST',
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
                    _this.data.articleList[index].collect = true;
                    _this.setData({
                        articleList: _this.data.articleList
                    });
                    wx.showToast({
                        title: '已成功收藏',
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
        })
    },

    uncollectArticle: function(id, index) {
        let _this = this;
        wx.request({
            url: host.BASE_URL + 'lg/uncollect_originId/' + id + '/json',
            method: 'POST',
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
                    _this.data.articleList[index].collect = false;
                    _this.setData({
                        articleList: _this.data.articleList
                    });
                    wx.showToast({
                        title: '已取消收藏',
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
        })
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.getBanner();
        // this.getTopArticleList();
        // this.getArticleList(this.data.pageNum);
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
        if (utils.isLogin()) {
            console.log('当前为已登录状态');
        } else {
            console.log('当前为未登录状态');
        }
        this.getTopArticleList();
        this.getArticleList(this.data.pageNum);
    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {
        this.setData({
            pageNum: 0,
            articleList: []
        })
    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {
        console.log('执行了onUnload方法');
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
        console.log('上拉加载触发');
        let pageNum = this.data.pageNum + 1;
        this.getArticleList(pageNum);
    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})