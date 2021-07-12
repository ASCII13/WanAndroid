import { fetchUnreadMsgCount } from '@/api/mine';

export function setRedDotState() {
    const { loggedIn } = getApp().globalData;
    if (loggedIn) {
        fetchUnreadMsgCount().then(res => {
            if (res.data > 0) {
                wx.showTabBarRedDot({
                    index: 2,
                });
            } else {
                wx.hideTabBarRedDot({
                    index: 2,
                });
            }
        })
    }
}