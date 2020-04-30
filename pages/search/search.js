// pages/search/search.js

const app = getApp();

import { isLogin, showToastWithoutIcon } from '../../utils/util.js';

Page({

    /**
     * Page initial data
     */
    data: {
        height: app.globalData.statusBarHeight,
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
        let currentPage = this.data.pageNum;
        this.getList('refresh', currentPage);

    },

    getList(type, currentPage) {
        let id = this.data.id;
        let searchStr = this.data.searchStr;

        app.httpGet(`/wxarticle/list/${id}/${currentPage}/json?k=${searchStr}`).then((res) => {
            let data = res.data;
            let articles = this.data.listData;

            if (type === 'more') {
                if (data.total > articles.length) {
                    this.setData({
                        listData: articles.concat(data.datas),
                        pageNum: currentPage + 1,
                        end: false
                    });
                } else {
                    this.setData({end: true});
                }
            } else {
                this.setData({
                    listData: data.datas,
                    pageNum: currentPage + 1
                })
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
        let url = encodeURIComponent(e.currentTarget.dataset.link);
        wx.navigateTo({
          url: `../detail/detail?url=${url}`,
        });
    },

    collect(e) {
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        let pageData = this.data.listData;

        if (isLogin()) {
            if (!pageData[index].collect) {
                app.httpPost(`/lg/collect/${id}/json`).then(() => {
                    pageData[index].collect = true;
                    this.setData({listData: pageData});
                    showToastWithoutIcon('收藏成功');
                });
            } else {
                app.httpPost(`/lg/uncollect_originId/${id}/json`).then(() => {
                    pageData[index].collect = false;
                    this.setData({listData: pageData});
                    showToastWithoutIcon('取消收藏');
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