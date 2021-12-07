// pages/home/home.js

import { showText } from '@/utils/toast';
import { star, unstar } from '@/api/favorite';
import { toLoginPage, toWebView } from '@/utils/router';
import { setRedDotState } from '@/utils/set-red-dot-state';
import { fetchBanner, fetchArticles, fetchTopArticles } from '@/api/home';

Page({

    /**
     * Page initial data
     */
    data: {
        banners: [],
        articles: [],
        pageNum: 0,
        loading: true,
        loggedIn: getApp().globalData.loggedIn,
    },

    bannerDetail: function(e) {
        toWebView(e.currentTarget.dataset.current);
    },

    articleDetail(e) {
        toWebView(e.currentTarget.dataset.url);
    },

    toggleCollect(e) {
        const { loggedIn, articles } = this.data;
        const { id, index } = e.currentTarget.dataset;

        if (!loggedIn) return toLoginPage();
        if (articles[index].collect) {
            unstar(id).then(() => {
                this.setData({['articles['+index+'].collect']: false}, showText('取消收藏'));
            });
        } else {
            star(id).then(() => {
                this.setData({['articles['+index+'].collect']: true}, showText('收藏成功'));
            });
        }
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        Promise.all([fetchBanner(), fetchTopArticles(), fetchArticles()]).then(res => {
            this.setData({loading: false});

            const banners = res[0].data;
            const tops = res[1].data;
            const articleData = res[2].data;
            const articles = articleData.datas;

            if (banners && banners.length > 0) {
                this.setData({banners});
            }
            if (tops && tops.length > 0) {
                const tmp = tops.map(t => {
                    t.top = true;
                    return t;
                });
                this.setData({articles: tmp});
            }
            if (articleData && articles && articles.length > 0) {
                const tmp = this.data.articles.concat(articles);
                this.setData({
                    articles: tmp,
                    pageNum: 1
                });
            }
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
        fetchArticles(this.data.pageNum).then(res => {
            const articleData = res.data;
            const datas = articleData.datas;
            const {articles, pageNum} = this.data;

            if (!articleData || !datas || datas.length === 0) {
                showText('暂无更多数据');
            } else {
                articles.push(...datas);
                this.setData({
                    articles,
                    pageNum: pageNum + 1
                });
            }
        });
    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})