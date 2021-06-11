const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formateDate = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isEmpty(string) {
  if (typeof (string) == 'undefined' || string == null || string == '') {
    return true;
  } else {
    return false;
  }
}

function isEmptyObj(obj) {
  if (Object.keys(obj).length > 0) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  formatTime: formatTime,
  formateDate: formateDate,
  isEmpty: isEmpty,
  isEmptyObj: isEmptyObj
}