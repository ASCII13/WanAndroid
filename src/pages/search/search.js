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
        emptyShow: true,
        listData: [],
        hasTop: false,
        enableBackToTop: false,
        pageNum: 1
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
        console.log('点击了搜索按钮');
        this.getList('refresh');

    },

    getList(type, currentPage = 1) {
        const { id, searchStr } = this.data;

        search(id, currentPage, searchStr).then(res => {
            const data = res.data;
            let articles = this.data.listData;

            if (type === 'more') {
                if (data.total > articles.length && data.datas) {
                    this.setData({
                        listData: articles.concat(data.datas),
                        pageNum: currentPage + 1,
                        end: false
                    });
                } else {
                    this.setData({ end: true });
                }
            } else {
                this.setData({
                    listData: data.datas,
                    pageNum: currentPage + 1,
                    end: false
                });
            }
        }); 
    },

    test() {
        console.log('触发点击事件');
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

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.setData({
            id: options.id,
            searchCategory: options.name
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