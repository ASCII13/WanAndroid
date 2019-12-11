// pages/officialaccount/officialaccount.js

let tabNum = 0;

const collectionImage = "../../images/collection.png";
const uncollectionImage = "../../images/uncollection.png";

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
        choosedTabInformation: "",
        testArray: [],
        articleList: [],
        collection: uncollectionImage,
        collectionState: false
    },

    /**
     * 滑动 swiper 切换 tab
     */
    switchTab: function(e) {
        let currentIndex = this.data.currentTab;
        let nextIndex = e.detail.current;

        console.log(`滑动后下标是：${nextIndex}`);

        this.setData({
            currentTab: nextIndex
        });

        if (currentIndex != nextIndex) {
            this.setData({
                lastTab: currentIndex
            });
        }

        this.scrollTab();
        this.getInformation(nextIndex);

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
        
        console.log(`点击了下标为${e.target.dataset.current}的标题`);

        let nextActivationIndex = e.target.dataset.current;
        let currentIndex = this.data.currentTab;
        if (currentIndex != nextActivationIndex) {
            this.setData({
                currentTab: nextActivationIndex,
                lastTab: currentIndex
            });
        } else {
            return false;
        }
        this.getInformation(nextActivationIndex);
    },

    changeCollectionState: function() {
        if (this.data.collectionState === false) {
            this.setData({
                collection: collectionImage,
                collectionState: true
            });
        } else {
            this.setData({
                collection: uncollectionImage,
                collectionState: false
            });
        }
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

    clickArticleItem: function(e) {
        let itemIndex = e.currentTarget.dataset.id;
        let title = `点击了${itemIndex}`;
        console.log(`itemIndex的值为:${itemIndex}`);
        wx.showToast({
            title: title,
            icon: 'none'
        })
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.getWindowSize();
        this.getTabName();
        this.getArticleList();
        this.getInformation(tabNum);
    },

    getTabName: function() {
        this.setData({
            testArray: [
                { name: '鸿洋', id: 408 },
                { name: '郭霖', id: 409 },
                { name: '玉刚说', id: 410 },
                { name: '承香墨影', id: 411 },
                { name: 'Android群英传', id: 412 },
                { name: 'code小生', id: 413 },
                { name: '谷歌开发者', id: 414 },
                { name: '奇卓社', id: 415 },
                { name: '美团技术团队', id: 416 },
                { name: 'GcsSloop', id: 417 },
                { name: '互联网侦察', id: 418 },
                { name: 'susion随心', id: 419 },
                { name: '程序亦非猿', id: 420 },
                { name: 'Gityuan', id: 421 }
            ]
        });
    },

    getInformation: function(tabNum) {
        if (tabNum == 0) {
            console.log("当前选中第一个标题");
            this.setData({
                choosedTabInformation: "1"
            });
        } else if (tabNum == 1) {
            console.log("当前选中第二个标题");
            this.setData({
                choosedTabInformation: "2"
            });
        } else if (tabNum == 2) {
            console.log("当前选中第三个标题");
            this.setData({
                choosedTabInformation: "3"
            });
        } else if (tabNum == 3) {
            console.log("当前选中第四个标题");
            this.setData({
                choosedTabInformation: "4"
            });

        } else if (tabNum == 4) {
            console.log("当前选中第五个标题");
            this.setData({
                choosedTabInformation: "5"
            });

        } else if (tabNum == 5) {
            console.log("当前选中第六个标题");
            this.setData({
                choosedTabInformation: "6"
            });

        } else if (tabNum == 6) {
            console.log("当前选中第七个标题");
            this.setData({
                choosedTabInformation: "7"
            });

        } else if (tabNum == 7) {
            console.log("当前选中第八个标题");
            this.setData({
                choosedTabInformation: "8"
            });

        } else if (tabNum == 8) {
            console.log("当前选中第九个标题");
            this.setData({
                choosedTabInformation: "9"
            });

        } else if (tabNum == 9) {
            console.log("当前选中第十个标题");
            this.setData({
                choosedTabInformation: "10"
            });

        } else if (tabNum == 10) {
            console.log("当前选中第十一个标题");
            this.setData({
                choosedTabInformation: "11"
            });

        } else if (tabNum == 11) {
            console.log("当前选中第十二个标题");
            this.setData({
                choosedTabInformation: "12"
            });

        } else if (tabNum == 12) {
            console.log("当前选中第十三个标题");
            this.setData({
                choosedTabInformation: "13"
            });

        } else if (tabNum == 13) {
            console.log("当前选中第十四个标题");
            this.setData({
                choosedTabInformation: "14"
            });
        }
    },

    getArticleList: function() {
        this.setData({
            articleList: [
                {
                    title: "面试官：今日头条启动很快，你觉得可能是做了哪些优化?面试官：今日头条启动很快，你觉得可能是做了哪些优化?",
                    publishTime: 1575475200000,
                    chapterId: 408
                },
                {
                    title: "Android10填坑适配指南，实际经验代码，拒绝翻译",
                    publishTime: 1575388800000,
                    chapterId: 409
                },
                {
                    title: "面试官：今日头条启动很快，你觉得可能是做了哪些优化?面试官：今日头条启动很快，你觉得可能是做了哪些优化?",
                    publishTime: 1575475200000,
                    chapterId: 410
                },
                {
                    title: "Android10填坑适配指南，实际经验代码，拒绝翻译",
                    publishTime: 1575388800000,
                    chapterId: 411
                },
                {
                    title: "面试官：今日头条启动很快，你觉得可能是做了哪些优化?面试官：今日头条启动很快，你觉得可能是做了哪些优化?",
                    publishTime: 1575475200000,
                    chapterId: 412
                },
                {
                    title: "Android10填坑适配指南，实际经验代码，拒绝翻译",
                    publishTime: 1575388800000,
                    chapterId: 413
                },
                {
                    title: "面试官：今日头条启动很快，你觉得可能是做了哪些优化?面试官：今日头条启动很快，你觉得可能是做了哪些优化?",
                    publishTime: 1575475200000,
                    chapterId: 414
                },
                {
                    title: "Android10填坑适配指南，实际经验代码，拒绝翻译",
                    publishTime: 1575388800000,
                    chapterId: 415
                },
                {
                    title: "面试官：今日头条启动很快，你觉得可能是做了哪些优化?面试官：今日头条启动很快，你觉得可能是做了哪些优化?",
                    publishTime: 1575475200000,
                    chapterId: 416
                },
                {
                    title: "Android10填坑适配指南，实际经验代码，拒绝翻译",
                    publishTime: 1575388800000,
                    chapterId: 417
                },
                {
                    title: "面试官：今日头条启动很快，你觉得可能是做了哪些优化?面试官：今日头条启动很快，你觉得可能是做了哪些优化?",
                    publishTime: 1575475200000,
                    chapterId: 418
                },
                {
                    title: "Android10填坑适配指南，实际经验代码，拒绝翻译",
                    publishTime: 1575388800000,
                    chapterId: 419
                },
                {
                    title: "面试官：今日头条启动很快，你觉得可能是做了哪些优化?面试官：今日头条启动很快，你觉得可能是做了哪些优化?",
                    publishTime: 1575475200000,
                    chapterId: 420
                },
                {
                    title: "Android10填坑适配指南，实际经验代码，拒绝翻译",
                    publishTime: 1575388800000,
                    chapterId: 421
                },
                {
                    title: "面试官：今日头条启动很快，你觉得可能是做了哪些优化?面试官：今日头条启动很快，你觉得可能是做了哪些优化?",
                    publishTime: 1575475200000,
                    chapterId: 422
                },
                {
                    title: "Android10填坑适配指南，实际经验代码，拒绝翻译",
                    publishTime: 1575388800000,
                    chapterId: 423
                },
                {
                    title: "面试官：今日头条启动很快，你觉得可能是做了哪些优化?面试官：今日头条启动很快，你觉得可能是做了哪些优化?",
                    publishTime: 1575475200000,
                    chapterId: 424
                },
                {
                    title: "Android10填坑适配指南，实际经验代码，拒绝翻译",
                    publishTime: 1575388800000,
                    chapterId: 425
                },
                {
                    title: "面试官：今日头条启动很快，你觉得可能是做了哪些优化?面试官：今日头条启动很快，你觉得可能是做了哪些优化?",
                    publishTime: 1575475200000,
                    chapterId: 426
                },
                {
                    title: "Android10填坑适配指南，实际经验代码，拒绝翻译",
                    publishTime: 1575388800000,
                    chapterId: 427
                }
            ]
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