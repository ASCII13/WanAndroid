// pages/search/search.js

import { showText } from '@/utils/toast';
import { toWebView, toLoginPage } from '@/utils/router';
import { search } from '@/api/official-account';
import { star, unstar } from '@/api/favorite';

Page({

    /**
     * Page initial data
     */
    data: {
        height: getApp().globalData.statusBarHeight,
        loggedIn: getApp().globalData.loggedIn,
        hideCancel: true,
        requesting: false,
        end: false,
        emptyShow: false,
        listData: [],
        hasTop: false,
        enableBackToTop: false,
        pageNum: 1,
        showResult: false
    },

    loseFocus(e) {
        this.setData({hideCancel: true});
    },

    getFocus() {
        this.setData({hideCancel: false});
    },

    inputContent(e) {
        this.setData({searchStr: e.detail.value});
    },

    search() {
        const newRecord = this.data.searchStr;
        if (newRecord) {
            let records = this.getSearchRecords() || [];
            if (records.length >= 10) {
                records.splice(0, (records.length - 10 + 1));
            }
            records.push({
                name: newRecord
            });
            wx.setStorageSync('searchRecords', records);
        }
        this.getList('init');
    },

    getList(type, currentPage = 1) {
        const { id, searchStr } = this.data;

        search(id, currentPage, searchStr).then(res => {
            const data = res.data;
            const { total, datas } = data;
            let articles = this.data.listData;

            if (type === 'more') {
                if (total > articles.length && datas && datas.length > 0) {
                    this.setData({
                        listData: articles.concat(datas),
                        pageNum: currentPage + 1,
                        end: false
                    });
                } else {
                    this.setData({ end: true });
                }
            } else {
                if (datas && datas.length > 0) {
                    this.setData({
                        listData: datas,
                        pageNum: currentPage + 1,
                        end: false,
                        showResult: true,
                    });
                } else {
                    this.setData({
                        emptyShow: true,
                        showResult: true
                    });
                }
            }
        }); 
    },

    more() {
        this.getList('more', this.data.pageNum);        
    },

    showArticle(e) {
        toWebView(e.currentTarget.dataset.link);
    },

    collect(e) {
        const { index, id } = e.currentTarget.dataset;
        let pageData = this.data.listData;

        if (this.data.loggedIn) {
            if (!pageData[index].collect) {
                star(id).then(() => {
                    pageData[index].collect = true;
                    this.setData({listData: pageData});
                    showText('收藏成功')
                });
            } else {
                unstar(id).then(() => {
                    pageData[index].collect = false;
                    this.setData({listData: pageData});
                    showText('取消收藏');
                });
            }
        } else {
            toLoginPage();
        }
    },

    getSearchRecords() {
        return wx.getStorageSync('searchRecords');
    },

    onTapRecord(e) {
        const record = e.currentTarget.dataset.content;
        this.setData({ searchStr: record });
        this.getList('init');
    },

    onTapClearRecord() {
        wx.showModal({
            cancelText: '取消',
            confirmText: '确定',
            content: '确定清空所有历史搜索记录吗？',
            success: (result) => {
                if (result.confirm) {
                    this.setData({
                        searchRecords: [],
                    }, () => {
                        wx.removeStorageSync('searchRecords');
                    });
                }
            },
        });
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const searchRecords = this.getSearchRecords();
        this.setData({
            id: options.id,
            searchCategory: options.name,
            searchRecords,
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