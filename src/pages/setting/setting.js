// pages/personalinfosetting/personalinfosetting.js

import { signOut } from '@/api/auth';

Page({

    /**
     * Page initial data
     */
    data: {

    },

    logout() {
        signOut().then(() => {
            getApp().globalData.loggedIn = false;

            wx.removeStorageSync('cookie');
            wx.removeStorageSync('nickname');
            wx.navigateBack({
                delta: 1,
            });
        });
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        
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