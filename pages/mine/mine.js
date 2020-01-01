// pages/mine/mine.js

let host = require('../../utils/host.js');

Page({

    /**
     * Page initial data
     */
    data: {
        isLogin: false,
        featureList: [],
        personalScore: 0,
        nickname: "",
        level: 0,
        rank: 0,
        username: "",
        isAllowLogin: false

    },

    login: function() {
        if (this.data.isLogin === false) {
            wx.navigateTo({
                url: '../login/login',
            });
        } else {
            console.log("当前已登录");
            wx.navigateTo({
                url: '../personalinfosetting/personalinfosetting',
            });
        }
    },

    getLocalAccountInfo: function() {
        let account = wx.getStorageSync('account');
        let password = wx.getStorageSync('password');
        console.log(`获取的account为：${account}`);
        console.log(`获取的password为：${password}`);

        if (account.length != 0 && password.length != 0 ) {
            this.setData({
                isAllowLogin: true
            });
        } else {
            this.setData({
                isAllowLogin: false
            });
        }
    },

    autoLogin: function() {
        if (this.data.isAllowLogin) {
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
                        wx.showToast({
                            title: res.data.errorMsg,
                            icon: 'none'
                        });
                    } else {
                        _this.setData({
                            isLogin: true,
                            nickname: res.data.data.nickname
                        });

                        wx.showToast({
                            title: '登录成功',
                            icon: 'none'
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
                    "Cookie": wx.getStorageSync('Set-Cookie')
                },
                success: function(res) {
                    if (res.data.errorCode != 0) {
                        wx.showToast({
                            title: res.data.errorMsg,
                            icon: 'none'
                        });
                    } else {
                        if (res.statusCode == 200) {
                            _this.setData({
                                personalScore: res.data.data.coinCount,
                                level: res.data.data.level,
                                rank: res.data.data.rank,
                                username: res.data.data.username
                            });
                        } else {
                            console.log('网络异常，获取积分失败');
                        }
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
            if (e.currentTarget.dataset.current == 0) {
                wx.navigateTo({
                    url: '../collectarticles/collectarticles',
                });
            } else if (e.currentTarget.dataset.current == 2) {
                let rank = _this.data.rank;
                let level = _this.data.level;
                let username = _this.data.username;
                let score = _this.data.personalScore;

                wx.navigateTo({
                    url: '../scorelevel/scorelevel?' + 'rank=' + rank + '&username=' + username + '&level=' + level + '&score=' + score,
                });
            } else {
                let title = `点击了第${e.currentTarget.dataset.current}个item`
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
        this.getLocalAccountInfo();
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