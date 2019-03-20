/* 公共方法 */
import { Base64 } from 'js-base64'

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

  // Base64加密
  Base64Encode(password) {
    if(typeof password !== 'string' || password.length === 0) return password

    let pwd = Base64.encode(password)
    let tmp1 = pwd.substring(0,2)
    let tmp2 = pwd.substring(2,pwd.length-2)
    let tmp3 = pwd.substring(pwd.length-2,pwd.length)
    return tmp3+tmp2+tmp1;
  },
  // Base64解密
  Base64Decode(pwd) {
    if(typeof pwd !== 'string' || pwd.length === 0) return pwd

    let tmp1 = pwd.substring(0,2)
    let tmp2 = pwd.substring(2,pwd.length-2)
    let tmp3 = pwd.substring(pwd.length-2,pwd.length)
    let password = tmp3+tmp2+tmp1
    return Base64.decode(password)
  },

  // 格式化文件大小单位
  renderSize(value) {
    if(!value) return "0 Bytes";
    var unitArr = new Array("Bytes","KB","MB","GB","TB","PB","EB","ZB","YB");
    var index=0;
    var srcsize = parseFloat(value);
    index=Math.floor(Math.log(srcsize)/Math.log(1024));
    var size =srcsize/Math.pow(1024,index);
    size=size.toFixed(2);//保留的小数位数
    return size+unitArr[index];
  },
}

export default util
