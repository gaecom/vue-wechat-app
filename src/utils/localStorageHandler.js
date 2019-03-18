/* 对localStorage中的数据进行统一加密处理，防止数据外泄 */
import util from '@/utils/util'

const localStorageHandler = {
  dataName: 'wechatData',
  getItem: function(name) {
    let obj = getItemData()
    if(obj && obj[name]) {
      return obj[name]
    }else{
      return null
    }
  },
  setItem: function(name, value) {
    let obj = getItemData()
    if(obj == null) obj = {}
    obj[name] = value
    setItemData(obj)
  },
  delItem: function(name) {
    let obj = getItemData()
    if(obj && obj[name]) {
      //删除并重新赋值
      delete obj[name]
      setItemData(obj)
    }else{
      return false
    }
  },
}
window.LSH = localStorageHandler

export default localStorageHandler


// localStorage取值
function getItemData() {
  return JSON.parse(util.Base64Decode( window.localStorage.getItem(this.dataName)))
}
// localStorage赋值
function setItemData(obj) {
  window.localStorage.setItem(this.dataName, util.Base64Encode(JSON.stringify(obj)))
}
