const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isEmpty(string) {
  if (typeof(string) == 'undefined' || string == null || string == '') {
    return true;
  } else {
    return false;
  }
}

function isLogin() {
  let cookie = wx.getStorageSync('cookie');
  let account = wx.getStorageSync('account');
  let password = wx.getStorageSync('password');

  if (!isEmpty(cookie) && !isEmpty(account) && !isEmpty(password)) {
    return true;
  } else {
    return false;
  }
}

function clearLoginInfo() {
  wx.removeStorageSync('cookie');
  wx.removeStorageSync('account');
  wx.removeStorageSync('password');
}

module.exports = {
  formatTime: formatTime,
  isEmpty: isEmpty,
  isLogin: isLogin,
  clearLoginInfo: clearLoginInfo
}
