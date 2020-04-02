// components/list/list.js
Component({
    /**
     * Component properties
     */
    properties: {
        bottomSize: {
            type: Number,
            value: 0
        },
        enableBackToTop: {
            type: Boolean,
            value: false
        },
        listCount: {
			type: Number,
			value: 0,
        },
        showEmpty: {
			type: Boolean,
			value: false,
        },
        emptyUrl: {
			type: String,
			value: "../../assets/images/nothing.svg"
        },
        emptyText: {
			type: String,
			value: "暂无数据"
        },
        end: {
			type: Boolean,
			value: false,
		},
    },

    /**
     * Component initial data
     */
    data: {
        scrollTop: 0,
        overOnePage: false,

    },

    /**
     * Component methods
     */
    methods: {
        more() {
            if (!this.properties.end) {
				this.setData({
					mode: 'more'
				});
				this.triggerEvent('more');
			}
        },

        /**
		 * 处理 bindscrolltolower 失效情况
		 */
		scroll(e) {
			// 可以触发滚动表示超过一屏
			this.setData({
				overOnePage: true
			});
			clearTimeout(this.data.timer);
			this.setData({
				timer: setTimeout(() => {
					this.setData({
						scrollTop: e.detail.scrollTop
					})
				}, 100)
			});
		},
    }
})
