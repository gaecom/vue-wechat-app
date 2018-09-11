<template>
  <div id="wx-header">
    <!--右边图标-->
    <div class="other">
      <span class="iconfont icon-tips-jia" v-show="$route.path==='/wechat'" @click="$store.commit('toggleTipsStatus')"></span>
      <ul class="tips-menu" :class="[$store.state.tipsStatus?'tips-open':'tips-close']"
          @click="$store.commit('toggleTipsStatus', -1)">
        <li>
          <span class="iconfont icon-tips-xiaoxi"></span>
          <div>发起群聊</div>
        </li>
        <router-link tag="li" to="/addresslist/add-friend">
          <span class="iconfont icon-tips-add-friend"></span>
          <div>添加朋友</div>
        </router-link>
        <li><span class="iconfont icon-tips-saoyisao"></span>
          <div>扫一扫</div>
        </li>
        <li><span class="iconfont icon-tips-fukuan"></span>
          <div>收付款</div>
        </li>
      </ul>
    </div>

    <!--当前页的标题-->
    <div class="center">
      <span>{{$store.state.currentPageName}}</span>
      <span class="parentheses" v-show='$route.query.group_num&&$route.query.group_num!=1'>{{$route.query.group_num}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>
<style lang="less">
  @import "../assets/less/wx-header.less";
</style>
