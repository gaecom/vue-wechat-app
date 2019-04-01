<template>
  <div id="app">
    <welcome></welcome>
    <div class="outter" :class="{'hideLeft':$route.path.split('/').length>2}">
      <!--通用头部-->
      <header class="app-header" :class="{'header-hide':!$store.state.headerStatus}">
        <wx-header></wx-header>
      </header>
      <!--搜索框 只在“微信”和“通讯录”页面下显示-->
      <search v-show="['/wechat','/addresslist'].includes($route.path)"></search>
      <!--四个导航页 “微信” “通讯录” “发现” “我”-->
      <section class="app-content">
        <keep-alive>
          <router-view name="default"></router-view>
        </keep-alive>
      </section>
      <!--底部导航 -->
      <footer class="app-footer">
        <wx-footer></wx-footer>
      </footer>
    </div>
    <!--路由过渡效果-->
    <transition name="custom-classes-transition" :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
      <router-view name="subPage" class="sub-page"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import WxHeader from '@/layout/WxHeader'
  import WxFooter from '@/layout/WxFooter'
  import Welcome from '@/components/Welcome'
  import Search from '@/components/Search'

  export default {
    name: 'app',
    components: {
      WxHeader,
      WxFooter,
      Welcome,
      Search,
    },
    data() {
      return {
        "routerAnimate": false,
        "enterAnimate": "", //页面进入动效
        "leaveAnimate": "" //页面离开动效
      }
    },
    watch: {
      // 监听 $route 为微信页面跳转设置不同的过渡效果
      "$route" (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        if (toDepth === 2) { //设置页面头部标题—四个导航页 “微信” “通讯录” “发现” “我”
          this.$store.commit("setPageName", to.name)
        }

        //同一级页面无需设置过渡效果
        if (toDepth === fromDepth) {
          return
        }
        this.enterAnimate = toDepth > fromDepth ? "animated fadeInRight" : "animated fadeInLeft"
        this.leaveAnimate = toDepth > fromDepth ? "animated fadeOutLeft" : "animated fadeOutRight"

        // 从导航页进入具体页面 需要重新设置离开动效 因为他们处于不同的 router-view
        if (toDepth === 3) {
          this.leaveAnimate = "animated fadeOutRight"
        }
      }
    }
  }
</script>

<style>
  /*将公用的样式统一在此导入*/
  @import "assets/css/base.css";
  @import "assets/css/common.css";
  /*阿里 fonticon*/
  @import "assets/css/lib/iconfont.css";
  /*过渡效果需要的动画库*/
  @import "assets/css/lib/animate.css";
  /*weui 样式库 非常适合高仿微信*/
  @import "assets/css/lib/weui.min.css";
</style>

