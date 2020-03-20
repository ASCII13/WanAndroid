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
        duration: 300
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
            orderby: 4
        }

        app.httpGet(`/lg/todo/v2/list/${currentPage}/json`, status).then((res) => {
            console.log(res.data);

            // let data = res.data || {
            //     datas: [],
            //     // over: false
            // };

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
            
            // let listData = data.datas || [];
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
        console.log(`点击了删除${e.currentTarget.dataset.id}`);

        let id = e.currentTarget.dataset.id;
        let pageData = this.getCurrentData();
        let currentCur = this.data.categoryCur;

        wx.showModal({
          content: '确定删除该事项？',
          success: (result) => {
              if (result.confirm) {
                  console.log(`确认删除`);
                  app.httpPost(`/lg/todo/delete/${id}/json`).then((res) => {
                      console.log(res);
                      if (res.errorCode == 0) {
                          // 删除操作
                      } else {
                          wx.showToast({
                            title: 'res.errorMsg',
                            icon: 'none'
                          });
                      }
                  });
              }
          },
        })
    },

    changeStatus(e) {
        console.log(e.detail.value);
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