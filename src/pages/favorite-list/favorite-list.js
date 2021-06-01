// pages/collectarticles/collectarticles.js

import { showToastWithoutIcon } from '@/utils/util';
import { fetchFavorites } from '@/api/favorite-list';
import { unfavorite } from '@/api/favorite';

// const app = getApp();

Page({

    /**
     * Page initial data
     */
    data: {
        dataList: [],
        pageNum: 0,
        requesting: false,
        end: false
    },

    delete(e) {
        let index = e.currentTarget.dataset.index;
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
        let index = e.currentTarget.dataset.index;
        let currentData = this.getCurrentData(index);
        let url = encodeURIComponent(currentData.link);

        wx.navigateTo({
          url: `../detail/detail?url=${url}`,
        });
    },

    uncollect(index) {
        let currentData = this.getCurrentData(index);
        let id = currentData.id;
        let originId = currentData.originId === undefined ? -1 : currentData.originId;

        unfavorite(id, originId).then(() => {
            let dataList = this.data.dataList;
            dataList.splice(index, 1);

            this.setData({dataList: dataList});
            showToastWithoutIcon('已取消收藏');
        });
    },

    getCurrentData(index) {
        return this.data.dataList[index];
    },

    getList(type, currentPage) {
        this.setData({requesting: true});

        fetchFavorites(currentPage).then(res => {
            this.setData({requesting: false});

            if (type === 'refresh') {
                this.setData({
                    dataList: res.data.datas,
                    pageNum: currentPage + 1
                });
            } else {
                if (res.data.total > this.data.dataList.length) {
                    this.setData({
                        dataList: this.data.dataList.concat(res.data.datas),
                        pageNum: currentPage + 1
                    });
                } else {
                    this.setData({end: true});
                }
            }
        });
    },

    refresh() {
        this.getList('refresh', 0);
    },

    more() {
        this.getList('more', this.data.pageNum);
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.getList('refresh', this.data.pageNum);
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