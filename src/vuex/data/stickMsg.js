import contact from './contacts' //存放所有联系人的数据
const stickMsg = [ //置顶消息列表
  {
    "mid": 5,
    "type": "friend",
    "group_name": "",
    "group_qrCode": "",
    //"read": true,
    "newMsgCount": 1,
    "quiet": false,
    "lastMsgDate": 1549958491713,
    "lastMsgContent": '夫君,身体要紧~',
    "msg": [{
      "sender": 'ssx',
      "type": 'text',
      "content": '夫君,身体要紧~ ',
      "date": 1549958491713,
      "name": "孙尚香",
      "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/sunshangxiang.jpg"
    }],
    "user": [contact.getUserInfo('wxid_sunshangxiang')]
  }
]
export default stickMsg
