<template>
  <div id="wx-header">
    <!--右边图标-->
    <div class="other">
      <span class="iconfont icon-tips-jia" v-show="$route.path==='/wechat'" @click="$store.commit('toggleTipsStatus')"></span>
      <ul class="tips-menu" :class="[$store.state.tipsStatus?'tips-open':'tips-close']"
          @click="$store.commit('toggleTipsStatus', -1)">
        <router-link v-for="(item,index) in tipsMenu" :key="index" :to="item.to" tag="li">
          <span class="iconfont" :class="item.icon"></span>
          <div>{{ item.name }}</div>
        </router-link>
      </ul>
    </div>

    <!--当前页的标题-->
    <div class="center">
      <span>{{$store.state.currentPageName}}</span>
      <span class="parentheses" v-show='$route.query.group_num&&$route.query.group_num!=1'>{{$route.query.group_num}}</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        tipsMenu: [
          {
            name: '发起群聊',
            to: '',
            icon: 'icon-tips-xiaoxi'
          },
          {
            name: '添加朋友',
            to: '/addresslist/add-friend',
            icon: 'icon-tips-add-friend'
          },
          {
            name: '扫一扫',
            to: '',
            icon: 'icon-tips-saoyisao'
          },
          {
            name: '收付款',
            to: '',
            icon: 'icon-tips-fukuan'
          }
        ]
      }
    },
  }
</script>
<style lang="less">
  @import "../assets/less/wx-header.less";
</style>
