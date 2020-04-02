// pages/search/search.js

const app = getApp();

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
            let dataList = res.data.datas;

            if (type === 'more') {
                this.setData({
                    listData: this.data.listData.concat(dataList),
                    pageNum: currentPage + 1,
                    end: false
                });
            } else {
                this.setData({
                    listData: dataList,
                    pageNum: currentPage + 1
                })
            }
        });   
    },

    test() {
        console.log('触发点击事件');
    },

    more() {
        console.log('触发上拉加载');
        this.getList('more', this.data.pageNum);        
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