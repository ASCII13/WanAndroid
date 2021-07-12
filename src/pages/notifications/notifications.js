import { fetchUnreadMsgs, fetchReadMsgs } from "@/api/mine";
import { toWebView } from "@/utils/router";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        currTab: 0,
        tabList: ['未读消息', '历史消息'],
        tabData: [],
        duration: 300,
    },
  
    switchTab(e) {
        console.log(`点击了${e.detail.index}`);
        this.setData({
            duration: 0
        });
        setTimeout(() => {
            this.setData({
                currTab: e.detail.index
            });
        }, 0);
    },

    refresh() {
        this.getTabData('init', 1);
    },

    more() {
        this.getTabData('more', this.getCurrTabData().currPage);
    },

    getUnreadMsgs(type, currTabData, currPage) {
        let currTab = this.data.currTab;
        fetchUnreadMsgs(currPage).then(res => {
            this.setRedDotState();
            
            currTabData.requesting = false;
            if (res.data && res.data.datas.length > 0) {
                let msgList = res.data.datas;
                if (type === 'init') {
                    currTabData.data = msgList;
                    currTabData.currPage = currPage + 1;
                }
                if (type === 'more') {
                    currTabData.data.push(...msgList);
                    currTabData.currPage = currPage + 1;
                }
            } else {
                if (type === 'init') {
                    currTabData.showEmpty = true;
                }
                if (type === 'more') {
                    currTabData.end = true;
                }
            }
            this.setCurrTabData(currTab, currTabData);
        });
    },

    getReadMsgs(type, currTabData, currPage) {
        let currTab = this.data.currTab;
        fetchReadMsgs(currPage).then(res => {
            currTabData.requesting = false;
            if (res.data && res.data.datas.length > 0) {
                let msgList = res.data.datas;
                if (type === 'init') {
                    currTabData.data = msgList;
                    currTabData.currPage = currPage + 1;
                }
                if (type === 'more') {
                    currTabData.data.push(...msgList);
                    currTabData.currPage = currPage + 1;
                }
            } else {
                if (type === 'init') {
                    currTabData.showEmpty = true;
                }
                if (type === 'more') {
                    currTabData.end = true;
                }
            }
            this.setCurrTabData(currTab, currTabData);
        });
    },

    getCurrTabData() {
        return this.data.tabData[this.data.currTab];
    },

    setCurrTabData(currTab, data) {
        let tabData = this.data.tabData;
        tabData[currTab] = data;

        this.setData({ tabData });
    },

    getTabData(type, currPage) {
        let currTab = this.data.currTab;
        let currTabData = this.getCurrTabData();

        if (currTabData.end) return;

        currTabData.requesting = true;
        this.setCurrTabData(currTab, currTabData);

        if (currTab === 0) {
            if (type === 'init') this.getUnreadMsgs('init', currTabData, currPage);
            if (type === 'more') this.getUnreadMsgs('more', currTabData, currPage);
        }

        if (currTab === 1) {
            if (type === 'init') this.getReadMsgs('init', currTabData, currPage);
            if (type === 'more') this.getReadMsgs('more', currTabData, currPage);
        }
    },

    animationfinish(e) {
        this.setData({
            duration: 300
        });
        setTimeout(() => {
            this.setData({
                currTab: e.detail.current
            });

            const currTabData = this.getCurrTabData();
            if (currTabData.data.length === 0) {
                this.getTabData('init', 1);
            }
        }, 0);
    },

    detail(e) {
        toWebView(e.currentTarget.dataset.link);
    },

    setRedDotState() {
        getApp().globalData.showRedDot = false;
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let { tabList, tabData } = this.data;
        tabList.forEach((item, index) => {
            tabData.push({
                tabIndex: index,
                currPage: 1,
                end: false,
                requesting: false,
                showEmpty: false,
                data: []
            });
        });
        this.setData({ tabData });
        this.getTabData('init', 1);
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
      
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
      
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
      
    }
})