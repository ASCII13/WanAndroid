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
        wx.showLoading({
            title: '',
        });
        let _this = this;
        wx.request({
            url: host.BASE_URL + 'coin/rank/' + pageNum + '/json',
            method: 'GET',
            success: function(res) {
                wx.hideLoading();
                if (res.data.errorCode != 0) {
                    wx.showToast({
                        title: res.data.errorMsg,
                        icon: 'none'
                    });
                } else {
                    let oldData = _this.data.rankInfoList;
                    let newData = res.data.data.datas;
                    _this.setData({
                        rankInfoList: oldData.concat(newData)
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

    getSelfRankInfo: function() {
        let cookie = wx.getStorageSync('Set-Cookie');
        let _this = this;
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

        }
    },

    // getWindowSize: function () {
    //     let _this = this;

    //     wx.getSystemInfo({
    //         success: function (res) {
    //             let clientHeight = res.windowHeight;
    //             let clientWidth = res.windowWidth;
    //             let rpxR = 750 / clientWidth;

    //             console.log("设备高度: ", clientHeight);
    //             console.log("设备宽度: ", clientWidth);

    //             let height = clientHeight * rpxR;
    //             let width = clientWidth * rpxR;

    //             console.log("高度: ", height);
    //             console.log("宽度: ", width);

    //             _this.setData({
    //                 scrollHeight: height - 150,  // 150为 scroll-view margin-top 高度
    //             });
    //         }
    //     });
    // },

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
        wx.stopPullDownRefresh();
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
        this.onShow();
    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {
        console.log('上拉加载触发');
        if (this.data.pageNum < 4) {
            let pageNum = this.data.pageNum + 1;
            this.setData({
                pageNum: pageNum
            });
            this.getRankInfoList(this.data.pageNum);
        } else {
            wx.showToast({
                title: '积分榜单仅展示前120名',
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