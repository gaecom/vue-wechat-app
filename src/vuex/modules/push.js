const push = {
  state: {
    isShow: false, //是否展示推送通知
    title: '', //通知标题
    content: '', //通知内容
    url: '', //跳转页面地址
    type: 0, //消息类型（0：系统消息 1：商机）
  },

  mutations: {
    setPushData: (state, data) => {
      state = Object.assign(state, data)
    },
    setPushIsShow: (state, data) => {
      state.isShow = data.isShow
    },
  }
}

export default push
