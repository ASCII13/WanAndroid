// pages/officialaccount/officialaccount.js

const app = getApp();
const utils = require('../../utils/util.js');

let pageStart = 1;

Page({
	data: {
		duration: 300,  // swiper-item 切换过渡时间
		categoryCur: 0, // 当前数据列索引
		categoryMenu: [], // 分类菜单数据, 字符串数组格式
		categoryData: [], // 所有数据列
		navigationHeight: app.globalData.navigationHeight // 自定义navigationBar高度
	},
	getList(type, currentPage) {
		let currentCur = this.data.categoryCur;
		let pageData = this.getCurrentData(currentCur);

		if (pageData.end) return;

		pageData.requesting = true;
		this.setCurrentData(currentCur, pageData);

		app.httpGet(`/wxarticle/list/${pageData.id}/${currentPage}/json`).then((res) => {
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
	// 更新页面数据
	setCurrentData(currentCur, pageData) {
		let categoryData = this.data.categoryData
		categoryData[currentCur] = pageData
		this.setData({
			categoryData: categoryData
		})
	},
	// 获取当前激活页面的数据
	getCurrentData() {
		return this.data.categoryData[this.data.categoryCur]
	},
	// 顶部tab切换事件
	toggleCategory(e) {
		console.log(1212)
		this.setData({
			duration: 0
		});
		setTimeout(() => {
			this.setData({
				categoryCur: e.detail.index
			});
		}, 0);
	},
	// 页面滑动切换事件
	animationFinish(e) {
		console.log(1313)

		this.setData({
			duration: 300
		});
		setTimeout(() => {
			this.setData({
				categoryCur: e.detail.current
			});
			let pageData = this.getCurrentData();
			if (pageData.listData.length === 0) {
				this.getList('refresh', pageStart);
			}
		}, 0);
	},
	// 刷新数据
	refresh() {
		this.getList('refresh', pageStart);
	},
	// 加载更多
	more() {
		this.getList('more', this.getCurrentData(this.data.categoryCur).page);
	},
	showArticle(e) {
		let url = encodeURIComponent(e.currentTarget.dataset.link);
		
		wx.navigateTo({
			url: `/pages/detail/detail?url=${url}`
		})
	},
	collect(e) {
		if (utils.isLogin()) {
			let id = e.currentTarget.dataset.id;
			let pageData = this.getCurrentData(this.data.categoryCur);
			
			pageData.listData.forEach((item) => {
				if (item.id == id) {
					if (item.collect === false) {
						app.httpPost(`/lg/collect/${id}/json`).then(() => {
							item.collect = true;

							this.setCurrentData(this.data.currentCur, pageData);

							wx.showToast({
								title: '收藏成功',
								icon: 'none'
							  });
						});
					} else {
						app.httpPost(`/lg/uncollect_originId/${id}/json`).then(() => {
							item.collect = false;

							this.setCurrentData(this.data.currentCur, pageData);

							wx.showToast({
								title: '取消收藏',
								icon: 'none'
							  });
						});
					}
				}
			});
		} else {
			wx.navigateTo({
			  url: '../login/login',
			});
		}
	},
	search() {
		utils.showToastWithoutIcon('点击了搜索按钮');
	},
	onLoad() {
		app.httpGet("/wxarticle/chapters/json").then((res) => {
			let menus = res.data || [];

			let categoryMenu = [];
			let categoryData = [];

			menus.forEach((item, index) => {
				categoryMenu.push(item.name.replace("&amp;", "&"));
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
				categoryMenu,
				categoryData
			});

			// 第一次加载延迟 350 毫秒 防止第一次动画效果不能完全体验
			setTimeout(() => {
				this.refresh();
			}, 350);
		})
	}
});