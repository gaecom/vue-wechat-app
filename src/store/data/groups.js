import contact from './contacts' //存放所有联系人的数据
const groups = [ //群组列表
  {
    "id": 1,
    "mid": 2,
    "type": "group",
    "group_name": "收购万达讨论群",
    "group_qrCode": "",
    "user": [contact.getUserInfo('wxid_zhaohd'), contact.getUserInfo('wxid_yehua')]
  },
  {
    "id": 2,
    "mid": 3,
    "type": "group",
    "group_name": "收购淘宝群",
    "group_qrCode": "",
    "user": [contact.getUserInfo('wxid_zhenji'), contact.getUserInfo('wxid_zhugeliang'), contact.getUserInfo('wxid_zhaohd'), contact.getUserInfo('wxid_guangyu')]
  },
  {
    "id": 3,
    "mid": null,
    "type": "group",
    "group_name": "帅哥群",
    "group_qrCode": "",
    "user": [contact.getUserInfo('wxid_zhenji'), contact.getUserInfo('wxid_zhugeliang'), contact.getUserInfo('wxid_zhaohd'), contact.getUserInfo('wxid_yehua'), contact.getUserInfo('wxid_guangyu')]
  },
]
export default groups
