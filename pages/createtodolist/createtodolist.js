// pages/createtodolist/createtodolist.js

const app = getApp();
const utils = require('../../utils/util.js');

Page({

    /**
     * Page initial data
     */
    data: {
        currentDate: '',
        startDate: '',
        allowCreate: false,
        title: '',
        content: ''
    },

    setDate(date) {
        console.log(utils.formateDate(date));
        
        let dateStr = utils.formateDate(date);
        this.setData({
            currentDate: dateStr,
            startDate: dateStr
        });
    },

    changeDate(e) {
        console.log(e.detail.value);
        this.setData({currentDate: e.detail.value}); 
    },

    /**
     * type 可选大于0的整数，不传默认为0，代表全部
     * priority 可选大于0的整数，确认优先级
     */
    create() {
        let title = this.data.title;
        let content = this.data.content || '';
        let date = this.data.currentDate;
        let type = 1;
        let priority = 1;

        let data = {
            title: title,
            content: content,
            date: date,
            type: type,
            priority: priority
        };

        app.httpPost('/lg/todo/add/json', data).then((res) => {
            this.backLastPage();
        });
    },

    inputTitle(e) {
        console.log(e.detail.value);

        let title = e.detail.value;
        this.setData({title: title});

        if (!utils.isEmpty(title)) {
            this.setData({allowCreate: true});
        } else {
            this.setData({allowCreate: false});
        }
    },

    inputContent(e) {
        console.log(e.detail.value);
        
        let content = e.detail.value;
        this.setData({content: content});
    },

    backLastPage() {
        wx.navigateBack({
          complete: (res) => {},
          delta: 1,
          fail: (res) => {},
          success: (res) => {
              utils.showToastWithoutIcon('创建成功');
          },
        })
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.setDate(new Date());
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