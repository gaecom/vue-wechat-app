<template>
  <!--公众号组件-->
  <div :class="{'search-open-contact':!$store.state.headerStatus}" class="official-account">
    <header id="wx-header">
      <div class="center">
        <router-link to="/addresslist" tag="div" class="iconfont icon-return-arrow">
          <span>通讯录</span>
        </router-link>
        <span>公众号</span>
      </div>
    </header>
    <!--这里的 search 组件的样式也需要修改一下-->
    <search></search>
    <!--公众号集合-->
    <template v-for="(value,key) in officialAccountsList">
      <div class="weui-cells__title">{{key}}</div>
      <div class="weui-cells">
        <div class="weui-cell weui-cell_access" v-for="item in value">
          <div class="weui-cell__hd">
            <img :src="item.headerUrl" class="home__mini-avatar___1nSrW">
          </div>
          <div class="weui-cell__bd">
            {{item.name}}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script type="text/ecmascript-6">
  import Search from '@/components/Search'
  export default {
    components: {
      Search
    },
    data() {
      return {

      }
    },
    computed: {
      // 提取公众号首字母 排序，所有公众号被存放在 officialAccounts.js 中
      initialList: function () {
        var initialList = [],
          officialAccounts = this.$store.state.officialAccounts,
          max = officialAccounts.length
        for (var i = 0; i < max; i++) {
          if (initialList.indexOf(officialAccounts[i].initial) == -1) {
            initialList.push(officialAccounts[i].initial)
          }
        }
        return initialList.sort()
      },
      // 将公众号按照首字母分类
      officialAccountsList() {
        var officialAccountsList = {},
          officialAccounts = this.$store.state.officialAccounts,
          max = officialAccounts.length;
        for (var i = 0; i < this.initialList.length; i++) {
          var protoTypeName = this.initialList[i]
          officialAccountsList[protoTypeName] = []
          for (var j = 0; j < max; j++) {
            if (officialAccounts[j].initial === protoTypeName) {
              officialAccountsList[protoTypeName].push(officialAccounts[j])
            }
          }
        }
        return officialAccountsList
      }
    }

  }
</script>
<style>
  .official-account {
    padding-bottom: 20px;
  }

  .official-account .weui-cell_access:active {
    background-color: rgba(177, 177, 177, 0.53)
  }
</style>
