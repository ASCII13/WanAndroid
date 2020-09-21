// pages/home/home.js

import { isLogin, showToastWithoutIcon } from '../../utils/util';

const app = getApp();

Page({

    /**
     * Page initial data
     */
    data: {
        bannerList: [],
        articleList: [],
        pageNum: 0,
        loading: true //调试用
    },

    getBanner() {
        app.httpGet('/banner/json').then((res) => {
            this.setData({bannerList: res.data});
        });
    },

    getList(type, currentPage) {
        app.httpGet(`/article/list/${currentPage}/json`).then((res) => {
            let data = res.data;
            let articles = this.data.articleList;

            if (type === 'more') {
                if (data.total > articles.length) {
                    this.setData({
                        articleList: articles.concat(data.datas),
                        pageNum: currentPage + 1
                    });
                } else {
                    showToastWithoutIcon('无更多数据');
                }
            } else {
                this.setData({
                    articleList: data.datas,
                    pageNum: currentPage + 1,
                    loading: false
                });
            }
        });
    },

    more() {
        this.getList('more', this.data.pageNum);
    },

    bannerDetail: function(e) {
        this.detail(e.currentTarget.dataset.current);
    },

    articleDetail(e) {
        this.detail(e.currentTarget.dataset.url);
    },

    detail(urlStr) {
        let url = encodeURIComponent(urlStr);
        wx.navigateTo({
          url: `../detail/detail?url=${url}`,
        });
    },

    collect(e) {
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        let datas = this.data.articleList;

        if (isLogin()) {
            if (datas[index].collect) {
                app.httpPost(`/lg/uncollect_originId/${id}/json`).then((res) => {
                    datas[index].collect = false;
                    this.setData({articleList: datas});
                    showToastWithoutIcon('取消收藏');
                });
            } else {
                app.httpPost(`/lg/collect/${id}/json`).then((res) => {
                    datas[index].collect = true;
                    this.setData({articleList: datas});
                    showToastWithoutIcon('收藏成功');
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
        this.getBanner();
        this.getList('refresh', this.data.pageNum);
        this.setData({login: isLogin()});
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
        if (isLogin() !== this.data.login) {
            this.getList('refresh', 0);
            this.setData({login: isLogin()});
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
        this.more('more', this.data.pageNum);
    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})