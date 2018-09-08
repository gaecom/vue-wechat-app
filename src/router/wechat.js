const Wechat = r => require.ensure([], () => r(require('@/view/wechat/Wechat')), 'wechat')
const Dialogue = r => require.ensure([], () => r(require('@/view/wechat/Dialogue')), 'wechat')
const DialogueDetail = r => require.ensure([], () => r(require('@/view/wechat/DialogueDetail')), 'wechat')
const DialogueInfo = r => require.ensure([], () => r(require('@/view/wechat/DialogueInfo')), 'wechat')

const wechat = [
  {
    path: '/wechat',
    name: '微信',
    component: Wechat
  },
  {
    path: '/wechat/dialogue',
    name: "聊天窗口",
    components: {
      "default": Wechat,
      "subPage": Dialogue
    }
  },
  {
    path: '/wechat/dialogue/dialogue-detail',
    name: '聊天详情',
    components: {
      "subPage": DialogueDetail
    }
  },
  {
    path: '/wechat/dialogue/dialogue-info',
    name: '聊天信息',
    components: {
      "subPage": DialogueInfo
    }
  }
]

export default wechat
