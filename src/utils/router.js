module.exports = {
    toLoginPage,
    toWebView,
    navigateTo,
}

/**
 * 此处无法使用别名@，会导致路径拼接错误，
 * 如：导入 home 会变成 pages/home/@/pages/login/login
 */
function toLoginPage() {
    wx.navigateTo({
        url: '../login/login',
    });
}

function toWebView(urlStr) {
    const url = encodeURIComponent(JSON.stringify(urlStr));
    wx.navigateTo({
        url: `../detail/detail?url=${url}`,
    })
}

/**
 * 
 * @param {目标路径是否需要登陆} needLogin 
 * @param {目标路径} path 
 */
function navigateTo(path, needLogin = true) {
    const loggedIn = getApp().globalData.loggedIn;
    if (needLogin && !loggedIn) {
        toLoginPage();
    } else {
        wx.navigateTo({
            url: path,
        });
    }
}