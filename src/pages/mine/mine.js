// pages/mine/mine.js

import { fetchSelfInfo } from '@/api/mine';

Page({

    /**
     * Page initial data
     */
    data: {
        featureList: [],
        personalScore: '-',
        nickname: '',
        loggedIn: getApp().globalData.loggedIn,
    },

    toLoginPage: function() {
        if (this.data.loggedIn) {
            wx.navigateTo({
              url: '../setting/setting',
            });
        } else {
            wx.navigateTo({
              url: '../login/login',
            });
        }
    },

    getSelfInfo() {
        fetchSelfInfo().then(res => {
            this.setData({
                personalScore: res.data.coinCount,
            });
        });
    },

    getFeatureList: function() {
        this.setData({
            featureList: [
                { 
                    icon: "../../assets/images/collect_article.png",
                    name: "收藏文章"
                },
                {
                    icon: "../../assets/images/todo_list.png",
                    name: "待办清单"
                },
                {
                    icon: "../../assets/images/score_level.png",
                    name: "积分排行"
                },
                {
                    icon: "../../assets/images/share_article.png",
                    name: "分享文章"
                },
                {
                    icon: "../../assets/images/share_project.png",
                    name: "分享项目"
                },
                {
                    icon: "../../assets/images/personal_info.png",
                    name: "个人信息"
                },
            ]               
        });
    },

    clickFeature: function(e) {
        if (this.data.loggedIn) {
            switch (e.currentTarget.dataset.current) {
                case 0:
                    wx.navigateTo({
                      url: '../favorite-list/favorite-list'
                    });
                    break;
                case 1:
                    wx.navigateTo({
                      url: '../todo/todo'
                    });
                    break;
                case 2:
                    wx.navigateTo({
                      url: '../ranking-list/ranking-list'
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
        const { loggedIn, nickname } = this.data;
        const loginState = getApp().globalData.loggedIn;

        if (loggedIn !== loginState) {
            this.setData({
                loggedIn: loginState
            });
        }
        if (loginState && !nickname) {
            this.getSelfInfo();
            this.setData({
                nickname: wx.getStorageSync('nickname'),
            });
        }
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