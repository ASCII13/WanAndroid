// pages/collectarticles/collectarticles.js

import { fetchFavorites } from '@/api/favorite-list';
import { unfavorite } from '@/api/favorite';
import { showText } from '@/utils/toast';
import { toWebView } from '@/utils/router';

Page({

    /**
     * Page initial data
     */
    data: {
        favorites: [],
        pageNum: 0,
        requesting: true,
        end: false
    },

    delete(e) {
        const index = e.currentTarget.dataset.index;
        wx.showModal({
            content: '确定取消收藏此文章？',
            success: (res) => {
                if (res.confirm) {
                    this.uncollect(index);
                }
            }
        }); 
    },

    showDetail(e) {
        const index = e.currentTarget.dataset.index;
        const currentData = this.getCurrentData(index);
        
        toWebView(currentData.link);
    },

    uncollect(index) {
        const currentData = this.getCurrentData(index);
        const id = currentData.id;
        const originId = currentData.originId || -1;

        unfavorite(id, originId).then(() => {
            const favorites = this.data.favorites;
            favorites.splice(index, 1);

            this.setData({favorites}, showText('已取消收藏'));
        });
    },

    getCurrentData(index) {
        return this.data.favorites[index];
    },

    getList({type, pageNum}) {
        if (type === 'refresh') {
            this.setData({requesting: true});
        }
        fetchFavorites(pageNum).then(res => {
            const data = res.data;
            const favorites = data.datas;
            
            if (!data || !favorites || !favorites.length) {
                if (type === 'refresh') {
                    this.setData({requesting: false});
                } else {
                    this.setData({end: true});
                }
            } else {
                if (type === 'refresh') {
                    this.setData({
                        favorites,
                        requesting: false,
                        pageNum: pageNum + 1
                    });
                } else {
                    this.setData({
                        favorites: this.data.favorites.concat(favorites),
                        pageNum: pageNum + 1
                    });
                }
            }
        });
    },

    refresh() {
        this.getList({
            type: 'refresh',
            pageNum: 0
        });
    },

    more() {
        this.getList({
            type: 'more',
            pageNum: this.data.pageNum
        });
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.getList({
            type: 'refresh',
            pageNum: 0
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