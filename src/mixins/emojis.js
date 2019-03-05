export default {
  methods: {
    // 消息显示前进行处理
    replaceMsg (con) {
      /*if (con.includes('/:')) { //将输入的内容中属于表情的部分替换成emoji图片标签
        var emojis = this.$store.getters.doneEmojis
        for (var i = 0; i < emojis.length; i++) {
          con = con.replace(emojis[i].reg, `<img src="${emojis[i].file}" alt="" style="vertical-align: middle; width: 24px; height: 24px;" />`)
        }
        return con
      }*/
      con = con.replace(/44/g, '24').replace(new RegExp('\n', 'gm'), '<br/>')
      return con
    },
  }
}
