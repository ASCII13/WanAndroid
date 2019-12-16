// pages/officialaccount/officialaccount.js

let host = require('../../utils/host.js');

const AUTHORS = host.AUTHORS;
const BASE_URL = host.BASE_URL;

Page({

    /**
     * Page initial data
     */
    data: {
        windowHeight: 0,
        windowWidth: 0,
        currentTab: 0,
        lastTab: -1,
        scrollLeft: 0,
        articleList: [],
        authorList: [],
        pageNum: 1,
        isGetAuthorsSuccess: false,
        total: 0
    },

    /**
     * 滑动 swiper 切换 tab
     */
    switchTab: function(e) {
        this.resetData();

        let currentIndex = this.data.currentTab;
        let nextIndex = e.detail.current;

        console.log(`滑动后下标是：${nextIndex}`);

        this.setData({
            currentTab: nextIndex
        });
        this.getArticles(this.data.currentTab, this.data.pageNum);

        if (currentIndex != nextIndex) {
            this.setData({
                lastTab: currentIndex
            });
        }

        this.scrollTab();

        // let current = e.detail.current;

        // this.setData({
        //     currentTab: current,
        // });
        
        // this.scrollTab();

        // console.log("当前选中tab标题", current);
        // this.getInformation(current);
    },

    scrollTab: function() {
        let distance  = this.data.windowWidth / 7;

        console.log("distance: ", distance);

        if (this.data.currentTab <= 2 && this.data.scrollLeft >= 0) {
            this.setData({
                scrollLeft: 0
            });
        } else {
            let movingDistance = this.data.currentTab > this.data.lastTab ? distance : -distance;

            this.setData({
                scrollLeft: this.data.scrollLeft + movingDistance
            });
        }
    },

    /**
     * 点击 tab 切换 swiper
     */
    switchNav: function(e) {
        // console.log("点击tab标题", e.target.dataset.current);

        // let cur = e.target.dataset.current;
        // if (this.data.currentTab == cur) {
        //     return false;
        // } else {
        //     this.setData({
        //         currentTab: cur,
        //     });
        // }
        // console.log("当前选中tab标题", cur);
        // this.getInformation(cur); 

        this.resetData();
        
        console.log(`点击了下标为${e.target.dataset.current}的标题`);

        let nextActivationIndex = e.target.dataset.current;
        let currentIndex = this.data.currentTab;
        if (currentIndex != nextActivationIndex) {
            this.setData({
                currentTab: nextActivationIndex,
                lastTab: currentIndex
            });

            this.getArticles(this.data.currentTab, this.data.pageNum);

        } else {
            return false;
        }
    },

    changeCollectionState: function() {
        
    },

    getWindowSize: function() {
        let _this = this;

        wx.getSystemInfo({
            success: function(res) {
                let clientHeight = res.windowHeight;
                let clientWidth = res.windowWidth;
                let rpxR = 750 / clientWidth;

                console.log("设备高度: ", clientHeight);
                console.log("设备宽度: ", clientWidth);

                let height = clientHeight * rpxR;
                let width = clientWidth * rpxR;

                console.log("高度: ", height);
                console.log("宽度: ", width);

                _this.setData({
                    windowHeight: height,
                    windowWidth: width
                });
            }
        });
    },

    // clickArticleItem: function(e) {
    //     let itemIndex = e.currentTarget.dataset.id;
    //     let title = `点击了${itemIndex}`;
    //     console.log(`itemIndex的值为:${itemIndex}`);
    //     wx.showToast({
    //         title: title,
    //         icon: 'none'
    //     })
    // },

    showArticleDetail: function(e) {
        let detailLink = encodeURIComponent(e.currentTarget.dataset.link);
        console.log(`点击的地址是${detailLink}`);
        wx.navigateTo({
            url: '../detail/detail' + '?url=' + detailLink
        })
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.getWindowSize();
    },

    getAuthorList: function() {
        wx.stopPullDownRefresh();

        console.log(`请求地址为：${AUTHORS}`)
        let _this = this;
        wx.request({
            url: AUTHORS,
            method: 'GET',
            success: function(res) {
                console.log(`公众号列表返回数据为：${res.data.data.title}`)
                _this.setData({
                    authorList: res.data.data,
                    isGetAuthorsSuccess: true
                });

                _this.getArticles(_this.data.currentTab, _this.data.pageNum);
            },
            fail: function() {
                wx.showToast({
                    title: '数据获取失败',
                    icon: 'none'
                });
                console.log("公众号列表数据请求失败");
            }
        })
    },

    getArticles: function(currentTab, pageNum) {
        if (this.data.isGetAuthorsSuccess === true) {
            let _this = this;
            let currentId = 0;

            _this.data.authorList.forEach(function(item, index, arr) {
                if (index == currentTab) {
                    currentId = item.id;
                }
            });
            console.log(`当前文章列表请求地址为：${BASE_URL}wxarticle/list/${currentId}/${pageNum}/json`)
            wx.request({
                url: BASE_URL + 'wxarticle/list/' + currentId + '/' + pageNum + '/json',
                method: 'GET',
                success: function(res) {
                    let oldData = _this.data.articleList;
                    let newData = res.data.data.datas;

                    _this.setData({
                        articleList: oldData.concat(newData),
                        total: res.data.data.total
                    });
                },
                fail: function() {
                    console.log('文章列表数据请求失败')
                }
            })
        } else {
            return false;
        }
    },

    /**
     * 切换tab选项时，将 页码 和 内容 复原
     */
    resetData: function() {
        this.setData({
            pageNum: 1,
            articleList: []
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
        this.getAuthorList();
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
        this.getAuthorList();
    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {
        console.log("触发上拉加载");
        let pageNum = this.data.pageNum + 1;
        this.setData({
            pageNum: pageNum
        });

        this.getArticles(this.data.currentTab, this.data.pageNum);
    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {


    }
})