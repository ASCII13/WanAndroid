// pages/officialaccount/officialaccount.js

let tabNum = 0;

Page({

    /**
     * Page initial data
     */
    data: {
        winHeight: "",
        currentTab: 0,
        choosedTabInformation: "",
        toView: "",
        testArray: []
    },

    switchTab: function(e) {
        let current = e.detail.current;
        let id = "id" + this.data.testArray[current].id.toString();
        console.log("当前id是：", id);

        this.setData({
            currentTab: current,
            toView: id
        });

        console.log("当前选中tab标题", current);
        this.getInformation(current);
    },

    switchNav: function(e) {
        console.log("点击tab标题", e.target.dataset.current);

        let cur = e.target.dataset.current;
        if (this.data.currentTab == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur,
            });
        }
        console.log("当前选中tab标题", cur);
        this.getInformation(cur);
        
    },

    getWindowHeight: function() {
        let that = this;

        wx.getSystemInfo({
            success: function(res) {
                let clientHeight = res.windowHeight;
                let clientWidth = res.windowWidth;
                let rpxR = 750 / clientWidth;

                console.log("设备高度：", clientHeight);
                console.log("设备宽度:", clientWidth);

                let calc = clientHeight * rpxR;

                console.log("calc", calc);

                that.setData({
                    winHeight: calc
                });
            }
        });
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.getWindowHeight();
        this.getTabName();
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