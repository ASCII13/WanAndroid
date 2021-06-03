// pages/createtodolist/createtodolist.js

// const app = getApp();
const utils = require('@/utils/util.js');

import { addTodo, upgradeTodo } from '@/api/todo';

Page({

    /**
     * Page initial data
     */
    data: {
        currentDate: '',
        startDate: '',
        allowCreate: false,
        title: '',
        content: '',
        // isFullScreen: app.globalData.isFullScreen
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
        let id = this.data.id;
        let status = this.data.status;

        switch (this.data.dataSrc) {
            case 0:
                addTodo({
                    title,
                    content,
                    date,
                    type,
                    priority
                }).then(res => {
                    this.backLastPage(this.data.dataSrc);
                });
                break;
            case 1:
                upgradeTodo(id, {
                    title,
                    content,
                    date,
                    status,
                    type,
                    priority
                }).then(res => {
                    this.backLastPage(this.data.dataSrc);
                });
                break;
        }
    },

    inputTitle(e) {
        console.log(e.detail.value);
        let title = e.detail.value;
        this.setData({title: title});
        this.checkCreateStatus();
    },

    inputContent(e) {
        console.log(e.detail.value);
        
        let content = e.detail.value;
        this.setData({content: content});
    },

    backLastPage(dataSrc) {
        let msg = dataSrc == 0 ? '创建成功' : '修改成功';
        wx.navigateBack({
          complete: (res) => {},
          delta: 1,
          fail: (res) => {},
          success: (res) => {
              utils.showToastWithoutIcon(msg);
          },
        })
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        let dateStr = utils.formateDate(new Date());

        if (options.item === undefined) {
            console.log('创建待办');

            this.setData({
                btnText: '创建',
                dataSrc: 0,
                currentDate: dateStr,
                startDate: dateStr
            });
        } else {
            console.log('编辑待办');

            let item = JSON.parse(options.item);
            this.setData({
                currentDate: item.dateStr,
                startDate: dateStr,
                title: item.title,
                content: item.content,
                id: item.id,
                status: item.status,
                type: item.type,
                priority: item.priority,
                btnText: '确定',
                dataSrc: 1
            });
        }
        this.checkCreateStatus();
    },

    checkCreateStatus() {
        let title = this.data.title;
        let time = this.data.currentDate;

        if (utils.isEmpty(title) || utils.isEmpty(time)) {
            this.setData({allowCreate: false});
        } else {
            this.setData({allowCreate: true});
        }
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {
        // let msg = this.data.dataSrc == 0 ? '创建事项' : '编辑事项';
        // wx.setNavigationBarTitle({
        //   title: msg,
        // });
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