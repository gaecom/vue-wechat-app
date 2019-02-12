const filters = {
  /**
   * 功能：将时间戳按照给定的 时间/日期 格式进行处理
   * @param {Number} date 时间戳
   * @param {String} fmtExp 时间格式 'hh:ss'
   * @returns {String} 规范后的 时间/日期 字符串
   */
  fmtDate: function (time, fmtExp) {
    let date = new Date(time)
    let o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmtExp))
      fmtExp = fmtExp.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmtExp))
        fmtExp = fmtExp.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmtExp;
  },
  /**
   * 功能：将时间戳按照给定的 聊天时间格式 进行处理
   * @param {Number} date 时间戳
   * @returns {String} 规范后的 时间/日期 字符串
   */
  chatFormatTime(time) {
    if (!time) return ''
    let dateTime = time ? new Date(time) : new Date()
    let year = dateTime.getFullYear()
    let month = dateTime.getMonth() + 1
    let day = dateTime.getDate()
    let hour = dateTime.getHours()
    let minute = dateTime.getMinutes()
    let second = dateTime.getSeconds()
    month = month < 10 ? ('0' + month) : month
    day = day < 10 ? ('0' + day) : day
    hour = hour < 10 ? ('0' + hour) : hour
    minute = minute < 10 ? ('0' + minute) : minute
    second = second < 10 ? ('0' + second) : second

    let now = new Date() //当前时间
    let milliseconds = now - dateTime //时间差
    let yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24) //昨天的这个时间点
    let timeStr
    if (dateTime.getDate() === now.getDate()) { //同一天 显示HH:mm
      timeStr = ''
    }else {
      if (yesterday.getYear() === dateTime.getYear() && yesterday.getMonth() === dateTime.getMonth() && yesterday.getDate() === dateTime.getDate()) { //昨天，显示昨天+HH:mm
        timeStr = `昨天 `
      } else if (milliseconds < 1000 * 60 * 60 * 24 * 7) { //一周之内,显示星期几+HH:mm
        let weekday = ''
        switch (dateTime.getDay()) {
          case 1:
            weekday = "星期一"
            break
          case 2:
            weekday = "星期二"
            break
          case 3:
            weekday = "星期三"
            break
          case 4:
            weekday = "星期四"
            break
          case 5:
            weekday = "星期五"
            break
          case 6:
            weekday = "星期六"
            break
          case 7:
            weekday = "星期日"
            break
        }
        timeStr = `${weekday} `
      } else { //其他时间显示年-月-日 HH:mm
        timeStr = `${year}年${month}月${day}日 `
      }
    }
    return `${timeStr}${hour}:${minute}`;
  },
}
export default (Vue) => {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}
