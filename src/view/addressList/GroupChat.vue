<template>
  <!--我的群聊组件-->
  <div :class="{'search-open-contact':!$store.state.headerStatus}">
    <header id="wx-header">
      <div class="center">
        <router-link to="/addresslist" tag="div" class="iconfont icon-return-arrow">
          <span>通讯录</span>
        </router-link>
        <span>群聊</span>
      </div>
    </header>
    <!--这里的 search 组件的样式需要修改一下-->
    <search></search>
    <section class="weui-cells">
      <template v-for="groupInfo in $store.state.chat.groupList">
        <a class="weui-cell weui-cell_access" @click="goGroupChat(groupInfo)">
          <div class="weui-cell__hd header-box">
            <div class="header multi-header">
              <img v-for="user in groupInfo.user" :src="user.headerUrl">
            </div>
          </div>
          <div class="weui-cell__bd">
            <p>{{groupInfo.group_name}}</p>
          </div>
        </a>
      </template>
    </section>
  </div>
</template>
<script type="text/ecmascript-6">
  import Search from '@/components/Search'
  export default {
    components: {
      Search
    },
    data() {
      return {}
    },
    computed: {
      // 从消息数据中提取出群聊列表 不严谨 应该新建 groups.js，存放所有群聊数据
//      groupList() {
//        var temp = []
//        for (var i in this.$store.state.chat.msgList) {
//          if (this.$store.state.chat.msgList[i].type === 'group') {
//            temp.push(this.$store.state.chat.msgList[i])
//          }
//        }
//        return temp
//      }
    },
    methods: {
      //进入聊天窗口
      goGroupChat(item) {
        this.$router.push({
          path: '/wechat/dialogue',
          query: {
            mid: item.mid,
            type: item.type,
            name: item.group_name,
            group_num: item.user.length,
          }
        })
      },
    },
  }
</script>
<style lang="less">
  @import "../../assets/less/common.less";
</style>
