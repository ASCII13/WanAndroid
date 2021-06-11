//app.js

App({
    onLaunch: function() {
        wx.getSystemInfo({
            success: (res) => {
                this.globalData.systemInfo = res;
                if (res.model.search('iphone X') !== -1) {
                    this.globalData.isIpohoneX = true;
                }
                // if (res.screenHeight - res.windowHeight - res.statusBarHeight - 34 > 72) {
                //     this.globalData.isFullScreen = true;
                // }

                this.globalData.statusBarHeight = res.statusBarHeight;
                let capsuleBound = wx.getMenuButtonBoundingClientRect();
                this.globalData.navigationHeight = capsuleBound.top - res.statusBarHeight + capsuleBound.bottom;
            }
        });
        this.setLoginState();
    },

    setLoginState() {
        const cookie = wx.getStorageSync('cookie');
        if (cookie) this.globalData.loggedIn = true;
    },

    globalData: {
        systemInfo: null,
        userInfo: null,
        isIpohoneX: false,
        loggedIn: false,
        statusBarHeight: 0,
        navigationHeight: 0
    }
})