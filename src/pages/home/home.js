// pages/home/home.js

import { showText } from '@/utils/toast';
import { star, unstar } from '@/api/favorite';
import { fetchBanner, fetchArticles } from '@/api/home';
import { toLoginPage, toWebView } from '@/utils/router';
import { setRedDotState } from '@/utils/set-red-dot-state';

Page({

    /**
     * Page initial data
     */
    data: {
        bannerList: [],
        articleList: [],
        pageNum: 0,
        loading: true,
        loggedIn: getApp().globalData.loggedIn,
    },

    getBanner() {
        fetchBanner().then(res => {
            this.setData({ bannerList: res.data });
        })
    },

    getArticleList(type, currPage) {
        fetchArticles(currPage).then(res => {
            const data = res.data;
            let articles = this.data.articleList;

            if (type === 'init') {
                this.setData({
                    articleList: data.datas,
                    pageNum: currPage + 1,
                    loading: false,
                })
            } else {
                if ((data.total > articles.length) && data.datas) {
                    this.setData({
                        articleList: articles.concat(data.datas),
                        pageNum: currPage + 1
                    })
                } else {
                    showText('无更多数据');
                }
            }
        })
    },

    bannerDetail: function(e) {
        toWebView(e.currentTarget.dataset.current);
    },

    articleDetail(e) {
        toWebView(e.currentTarget.dataset.url);
    },

    collect(e) {
        const { id, index } = e.currentTarget.dataset;
        const { loggedIn } = this.data;
        let { articleList } = this.data;

        if (loggedIn) {
            if (articleList[index].collect) {
                unstar(id).then(() => {
                    articleList[index].collect = false;
                    this.setData({ articleList, });
                    showText('取消收藏');
                });
            } else {
                star(id).then(() => {
                    articleList[index].collect = true;
                    this.setData({ articleList, });
                    showText('收藏成功');
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
        this.getBanner();
        this.getArticleList('init', 0);
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
        const { loggedIn } = this.data;
        const loginState = getApp().globalData.loggedIn;
        if (loggedIn !== loginState) {
            this.setData({
                loggedIn: loginState,
            });
        }
        setRedDotState();
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
        this.getArticleList('more', this.data.pageNum);
    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})