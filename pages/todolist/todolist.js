// pages/todolist/todolist.js

const app = getApp();

let pageStart = 1;

Page({

    /**
     * Page initial data
     */
    data: {
        tabData: [],
        categoryData: [],
        categoryCur: 0,
        duration: 300,
        showToDoList: false
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        let menu = [
            {   name: "待办理",
                id: 0
            },
            {
                name: "已完成",
                id: 1
            }
        ];

        let categoryData = [];
        let tabData = [];

        menu.forEach((item, index) => {
            tabData.push(item.name);
            categoryData.push({
                id: item.id,
                categoryCur: index,
                requesting: false,
                end: false,
                emptyShow: false,
                page: pageStart,
                listData: []
            });
        });

        this.setData({
            tabData: tabData,
            categoryData: categoryData
        });

        setTimeout(() => {
            this.refresh();
        }, 350);
    },

    getCategoryData(type, currentPage) {
        let currentCur = this.data.categoryCur;
        let pageData = this.getCurrentData();

        if (pageData.end) return;

        pageData.requesting = true;
        this.setCurrentData(currentCur, pageData);

        let status = {
            status: pageData.id,
            orderby: 3
        }

        app.httpGet(`/lg/todo/v2/list/${currentPage}/json`, status).then((res) => {
            console.log(res.data);

            let data = res.data || {
                datas: [],
                over: false
            };

            let listData = data.datas || [];
            pageData.requesting = false;

            if (type === 'refresh') {
                pageData.listData = listData;
                pageData.end = data.over;
                pageData.page = currentPage + 1;
            } else {
                pageData.listData = pageData.listData.concat(listData);
                pageData.end = data.over;
                pageData.page = currentPage + 1;
            }

            this.setCurrentData(currentCur, pageData);
        });
    },

    getCurrentData() {
        return this.data.categoryData[this.data.categoryCur];
    },

    setCurrentData(currentCur, pageData) {
        let categoryData = this.data.categoryData;
        categoryData[currentCur] = pageData;

        this.setData({
            categoryData: categoryData
        });

    },

    refresh() {
        this.getCategoryData('refresh', pageStart);
    },

    animationFinish(e) {
        console.log('执行了animationFinish');
        this.setData({
            duration: 300
        });

        setTimeout(() => {
            this.setData({
                categoryCur: e.detail.current
            });
            console.log(`categoryCur=${this.data.categoryCur}`);
            let pageData = this.getCurrentData();
            if (pageData.listData.length === 0) {
                this.getCategoryData('refresh', pageStart);
            }
        }, 0);
    },

    showToDoList(e) {
        wx.showToast({
          title: `点击了${e.currentTarget.dataset.id}`,
          icon: 'none'
        });
    },

    tabChange(e) {
        console.log(`点击了${e.detail.index}`);
        
        this.setData({
            duration: 0
        });
        setTimeout(() => {
            this.setData({
                categoryCur: e.detail.index
            });
            console.log(`categoryCur=${this.data.categoryCur}`);
        }, 0);
    },

    more() {
        this.getCategoryData('more', this.getCurrentData().page);
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