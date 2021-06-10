// pages/mine/mine.js

import { fetchSelfInfo } from '@/api/mine';
import { navigateTo } from '@/utils/router';

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

    onTapCard() {
        navigateTo('../setting/setting');
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
            ]               
        });
    },

    onTapFeature: function(e) {
        switch (e.currentTarget.dataset.current) {
            case 0:
                navigateTo('../favorite-list/favorite-list');
                break;
            case 1:
                navigateTo('../todo/todo');
                break;
            case 2:
                navigateTo('../ranking-list/ranking-list');
                break;
            default:    
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