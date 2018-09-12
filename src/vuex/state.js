import officialAccounts from "./data/officialAccount" //存放所有关注的公众号
import contact from './data/contacts' //存放所有联系人的数据
import msglist from './data/msglist' //存放消息列表的数据

// 全局state
const state = {
  currentLang: "zh", //当前使用的语言 zh：简体中文 en:英文 后期需要
  newMsgCount: 0, //新消息数量
  msgList:msglist, //消息列表
  allContacts: contact.contacts, //所有联系人
  officialAccounts: officialAccounts, //所有关注的公众号
  currentPageName: "", //用于在wx-header组件中显示当前页标题
  headerStatus: true, //显示（true）/隐藏（false）wx-header组件
  tipsStatus: false, //控制首页右上角菜单的显示(true)/隐藏(false)
  apiUrl: '', //统一管理接口域名、地址
}

export default state
