<template>
  <!--微信组件-->
  <div id="wechat">
    <ul class="wechat-list">
      <!--props传递消息对象 baseMsgObj -->
      <msg-list v-for="baseMsgObj in $store.state.chat.msgList" :item="baseMsgObj" class="list-row line-bottom"
                :key="baseMsgObj.mid"></msg-list>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import Search from '@/components/Search'
  import MsgList from "@/components/MsgList"
  export default {
    components: {
      Search,
      MsgList
    },
    data() {
      return {

      }
    },
    created() {
      // 消息列表排序
      this.$store.commit('setMsgSort')
    }
  }
</script>
<style lang="less">
  @import "../../assets/less/wechat.less";
</style>
