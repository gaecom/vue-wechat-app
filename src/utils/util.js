const util = {
  // 时间戳格式化
  formatDateTime(time) {
    var date = new Date(time);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
  },
  // 获取相比当前时间的日期（0：当天，-6：7天前）
  getBeforeDay(day){
    let today = new Date();
    let targetday_milliseconds = today.getTime() + 1000*60*60*24*day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    let y = today.getFullYear();
    let m = today.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = today.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
  },
  // 聊天时间格式
  chatFormatTime(time) {
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

export default util
