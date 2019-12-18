// pages/mine/mine.js
Page({

    /**
     * Page initial data
     */
    data: {
        isLogin: false,
        featureList: []

    },

    login: function() {
        if (this.data.isLogin === false) {
            wx.navigateTo({
                url: '../login/login',
            });
        } else {
            console.log("当前已登录");
            return false;
        }
    },

    getFeatureList: function() {
        this.setData({
            featureList: [
                { 
                    icon: "../../images/collect_article.png",
                    name: "收藏文章"
                },
                {
                    icon: "../../images/todo_list.png",
                    name: "代办清单"
                },
                {
                    icon: "../../images/score_level.png",
                    name: "积分排行"
                },
                {
                    icon: "../../images/share_article.png",
                    name: "分享文章"
                },
                {
                    icon: "../../images/share_project.png",
                    name: "分享项目"
                },
                {
                    icon: "../../images/personal_info.png",
                    name: "个人信息"
                },
            ]               
        });
    },

    clickFeature: function(e) {
        let title = `点击了${e.currentTarget.dataset.current}`;
        wx.showToast({
            title: title,
            icon: 'none'
        });
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