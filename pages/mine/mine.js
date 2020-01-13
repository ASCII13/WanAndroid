// pages/mine/mine.js

let host = require('../../utils/host.js');
let utils = require('../../utils/util.js');

Page({

    /**
     * Page initial data
     */
    data: {
        featureList: [],
        personalScore: 0,
        nickname: "",
        level: 0,
        rank: 0,
        username: "",
        isLogin: false
    },

    login: function() {
        if (this.data.isLogin) {
            wx.navigateTo({
              url: '../personalinfosetting/personalinfosetting',
            });
        } else {
            wx.navigateTo({
              url: '../login/login',
            });
        }
    },

    autoLogin: function() {
        if (this.data.isLogin) {
            let _this = this;
            wx.request({
                url: host.BASE_URL + 'user/login',
                method: 'POST',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: {
                    username: wx.getStorageSync('account'),
                    password: wx.getStorageSync('password')
                },
                success: function (res) {
                    if (res.data.errorCode != 0) {
                        utils.clearLoginInfo();

                        wx.showToast({
                            title: res.data.errorMsg,
                            icon: 'none'
                        });
                    } else {
                        _this.setData({
                            isLogin: true,
                            nickname: res.data.data.nickname
                        });
                    }
                    _this.getPersonalScore();
                },
                fail: function () {
                    wx.showToast({
                        title: '网络异常，登录失败',
                        icon: 'none'
                    })
                }
            });
        } else {
            console.log('本地账户信息为空，无法登录');
            return false;
        }    
    },

    getPersonalScore: function() {
        let _this = this;
        if (this.data.isLogin) {
            wx.request({
                url: host.BASE_URL + 'lg/coin/userinfo/json',
                method: 'GET',
                header: {
                    "Cookie": wx.getStorageSync('cookie')
                },
                success: function(res) {
                    if (res.data.errorCode != 0) {
                        wx.showToast({
                            title: res.data.errorMsg,
                            icon: 'none'
                        });
                    } else {
                        _this.setData({
                            personalScore: res.data.data.coinCount,
                            level: res.data.data.level,
                            rank: res.data.data.rank,
                            username: res.data.data.username
                        });
                    }
                },
                fail: function() {
                    console.log('网络异常，获取积分失败');
                }
            });
        } else {
            console.log('登录失败，无法获取个人积分信息');
            return false;
        }
    },

    getFeatureList: function() {
        this.setData({
            featureList: [
                { 
                    icon: "../../images/collect_article.png",
                    name: "收藏文章"
                },
                {
                    icon: "../../images/todo_list.png",
                    name: "代办清单"
                },
                {
                    icon: "../../images/score_level.png",
                    name: "积分排行"
                },
                {
                    icon: "../../images/share_article.png",
                    name: "分享文章"
                },
                {
                    icon: "../../images/share_project.png",
                    name: "分享项目"
                },
                {
                    icon: "../../images/personal_info.png",
                    name: "个人信息"
                },
            ]               
        });
    },

    clickFeature: function(e) {
        if (this.data.isLogin) {
            let _this = this;
            switch (e.currentTarget.dataset.current) {
                case 0:
                    wx.navigateTo({
                      url: '../collectarticles/collectarticles'
                    });
                    break;
                case 1:
                    wx.navigateTo({
                      url: '../todolist/todolist'
                    });
                    break;
                case 2:
                    let rank = _this.data.rank;
                    let level = _this.data.level;
                    let username = _this.data.username;
                    let score = _this.data.personalScore;

                    wx.navigateTo({
                      url: '../scorelevel/scorelevel' + '?rank=' + rank + '&username=' + username + '&level=' + level + '&score=' + score
                    });
                    break;
                default:
                    let title = `点击了第${e.currentTarget.dataset.current}个item`;
                    wx.showToast({
                      title: title,
                      icon: 'none'
                    });
            }
        } else {
            wx.navigateTo({
              url: '../login/login',
            });
        }
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.getFeatureList();
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
        let isLogin = utils.isLogin();
        this.setData({
            isLogin: isLogin
        });
        this.autoLogin();
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