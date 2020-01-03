// pages/scorelevel/scorelevel.js

let host = require('../../utils/host.js');

Page({

    /**
     * Page initial data
     */
    data: {
        rankInfoList: [],
        pageNum: 1,
        rank: 0,
        username: "",
        level: 0,
        score: 0
    },

    getRankInfoList: function(pageNum) {  
        wx.stopPullDownRefresh();
              
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
                    let oldData = _this.data.rankInfoList;
                    let newData = res.data.data.datas;

                    if (oldData.length >= 120) {
                        wx.showToast({
                          title: '排行榜仅展示前120名',
                          icon: 'none'
                        });
                    } else if (oldData.length == 0 && newData.length == 0) {
                        wx.showToast({
                            title: '暂无排行榜数据',
                            icon: 'none'
                          });
                    } else {
                        _this.setData({
                            rankInfoList: oldData.concat(newData),
                            pageNum: pageNum
                        });
                    }
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

    getSelfRankInfo: function() {
        wx.stopPullDownRefresh();

        let _this = this;
        let cookie = wx.getStorageSync('Set-Cookie');
        if (cookie.length != 0) {
            wx.request({
                url: host.BASE_URL + 'lg/coin/userinfo/json',
                method: 'GET',
                header: {
                    'Cookie': cookie
                },
                success: function(res) {
                    if (res.data.errorCode != 0) {
                        return false
                    } else {
                        _this.setData({
                            rank: res.data.data.rank,
                            username: res.data.data.username,
                            level: res.data.data.level,
                            score: res.data.data.coinCount
                        });
                    }
                },
                fail: function() {
                    console.log('个人积分接口，网络异常');
                }
            });
        } else{
            return;
        }
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        //设置下拉刷新背景色
        wx.setBackgroundColor({
            backgroundColor: "#F7F7F7"
        });
        
        this.setData({
            rank: options.rank,
            username: options.username,
            level: options.level,
            score: options.score
        });
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
        this.getSelfRankInfo();
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
        console.log('下拉刷新触发');
        this.setData({
            rankInfoList: [],
            pageNum: 1,
            rank: 0,
            username: "",
            level: 0,
            score: 0
        });
        this.getRankInfoList(this.data.pageNum);
        this.getSelfRankInfo();
    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {
        console.log('上拉加载触发');
        let pageNum = this.data.pageNum + 1;
        this.getRankInfoList(pageNum);
    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})