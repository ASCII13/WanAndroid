// pages/todolist/todolist.js

const app = getApp();
const utils = require('@/utils/util');

import { fetchTodoList, removeTodo, finishTodo } from '@/api/todo';

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
        emptyText: '暂无数据'
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
                emptyShow: true,
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

        // let status = {
        //     status: pageData.id,
        //     orderby: 4
        // }

        fetchTodoList(currentPage, pageData.id).then(res => {
            let tmp = res.data.datas.map((item) => {
                return item.dateStr;
            });
            let time = new Set(tmp);
            let timeCatgoryData = [];

            for (let ele of time) {
                let list = res.data.datas.filter((i) => i.dateStr == ele);
                timeCatgoryData.push({
                    showDetail: false,
                    date: ele,
                    list: list
                });
            }

            let listData = timeCatgoryData || [];
            pageData.requesting = false;

            if (type === 'refresh') {
                pageData.listData = listData;
                // pageData.end = data.over;
                pageData.page = currentPage + 1;
            } else {
                pageData.listData = pageData.listData.concat(listData);
                // pageData.end = data.over;
                pageData.page = currentPage + 1;
            }
            console.log(pageData)
            this.setCurrentData(currentCur, pageData);
        });

        // app.httpGet(`/lg/todo/v2/list/${currentPage}/json`, status).then((res) => {
        //     console.log(res.data);

        //     // let data = res.data || {
        //     //     datas: [],
        //     //     // over: false
        //     // };

        //     let tmp = res.data.datas.map((item) => {
        //         return item.dateStr;
        //     });
        //     let time = new Set(tmp);
        //     let timeCatgoryData = [];

        //     for (let ele of time) {
        //         let list = res.data.datas.filter((i) => i.dateStr == ele);
        //         timeCatgoryData.push({
        //             showDetail: false,
        //             date: ele,
        //             list: list
        //         });
        //     }
            
        //     // let listData = data.datas || [];
        //     let listData = timeCatgoryData || [];
        //     pageData.requesting = false;

        //     if (type === 'refresh') {
        //         pageData.listData = listData;
        //         // pageData.end = data.over;
        //         pageData.page = currentPage + 1;
        //     } else {
        //         pageData.listData = pageData.listData.concat(listData);
        //         // pageData.end = data.over;
        //         pageData.page = currentPage + 1;
        //     }
        //     console.log(pageData)
        //     this.setCurrentData(currentCur, pageData);
        // });
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
        let pageData = this.getCurrentData();
        let currentCur = this.data.categoryCur;
        let date = e.currentTarget.dataset.id;

        pageData.listData.forEach((item) => {
            if (item.date == date) {
                item.showDetail = !item.showDetail;
                this.setCurrentData(currentCur, pageData);
            }
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

    delete(e) {
        let categoryIndex = e.currentTarget.dataset.category;
        let detailIndex = e.currentTarget.dataset.detail;
        let id = e.currentTarget.dataset.id;

        wx.showModal({
          content: '确定删除该事项？',
          success: (result) => {
              if (result.confirm) {
                  console.log(`确认删除`);
                  removeTodo(id).then(res => {
                      this.deleteTodo(categoryIndex, detailIndex, 1);
                      utils.showToastWithoutIcon('删除成功');
                  });
                //   app.httpPost(`/lg/todo/delete/${id}/json`).then((res) => {
                //       console.log(res);
                //       this.deleteTodo(categoryIndex, detailIndex, 1);
                //       utils.showToastWithoutIcon('删除成功');
                //   });
              }
          },
        });
    },

    createTodo() {
        wx.navigateTo({
          url: '../create-todo/create-todo',
        });
    },

    changeStatus(e) {
        console.log(e.currentTarget.dataset);

        let status = e.currentTarget.dataset.status == 0 ? 1 : 0;
        let categoryIndex = e.currentTarget.dataset.category;
        let detailIndex = e.currentTarget.dataset.detail;
        let id = e.currentTarget.dataset.id;

        let content = status == 1 ? '确定将该事项标记为已完成？' : '确定将该事项标记为待办理？';
        let msg = status == 1 ? '该事项标记为已完成' : '该事项标记为待办理';

        let data = {
            status: status
        };

        wx.showModal({
          content: content,
          success: (result) => {
              if (result.confirm) {
                  finishTodo(id, status).then(res => {
                      this.deleteTodo(categoryIndex, detailIndex, 1);
                      utils.showToastWithoutIcon(msg);
                  });
                //   app.httpPost(`/lg/todo/done/${id}/json`, data).then((res) => {
                //       console.log(res);
                //       this.deleteTodo(categoryIndex, detailIndex, 1);
                //       utils.showToastWithoutIcon(msg);
                //   });
              }
          },
        })
    },

    /**
     * 删除待办事项
     * @param categoryIndex 分组日期的下标位置
     * @param detailIndex  当前分组中下标位置
     * @param howmany 删除数量
     */
    deleteTodo(categoryIndex, detailIndex, howmany) {
        let pageData = this.getCurrentData();
        let currentCur = this.data.categoryCur;

        pageData.listData[categoryIndex].list.splice(detailIndex, howmany);
        this.setCurrentData(currentCur, pageData);
    },

    editTodoItem(e) {
        console.log(e.currentTarget.dataset.item);
        let item = JSON.stringify(e.currentTarget.dataset.item);

        wx.navigateTo({
          url: `../create-todo/create-todo?item=${item}`,
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