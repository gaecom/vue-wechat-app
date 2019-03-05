<template>
  <!--消息列表组件 数据交互频繁-->
  <!--进入 dialogue 页面，携带参数 mid name group_num -->
  <li :class="{'item-hide':deleteMsg}">
    <!--自定义指令 v-swiper 用于对每个消息进行滑动处理-->
    <router-link
      :to="{ path: '/wechat/dialogue', query: { mid: item.mid,type: item.type,name: item.group_name||item.user[0].remark||item.user[0].nickname,group_num: item.user.length}}"
      tag="div" class="list-info" v-swiper @click.native="toggleMsgRead($event,'enter')">
      <div class="header-box">
        <template v-if="item.newMsgCount>0">
          <!--未读并且未屏蔽 才显示新信息数量-->
          <i class="new-msg-count" v-if="!item.quiet">{{item.newMsgCount}}</i>
          <!--未读并且屏蔽 只显示小红点-->
          <i class="new-msg-dot" v-else></i>
        </template>
        <!--如果是私聊，只显示一个头像； 如果是群聊，则显示多个头像，flex 控制样式-->
        <div class="header" :class="[item.type=='group'?'multi-header':'']">
          <img v-for="userInfo in item.user" :src="userInfo.headerUrl">
        </div>
      </div>
      <div class="desc-box">
        <!--使用过滤器 fmtDate 格式化时间-->
        <div class="desc-time">{{item.msg[item.msg.length-1].date | chatFormatTime}}</div>
        <div class="desc-author" v-if="item.type=='group'">{{item.group_name}}</div>
        <!--如果没有备注好友，则显示微信昵称-->
        <div class="desc-author" v-else>{{item.user[0].remark||item.user[0].nickname}}</div>
        <div class="desc-msg">
          <!--免打扰-->
          <div class="desc-mute iconfont icon-mute" v-show="item.quiet"></div>
          <!--显示最新消息-->
          <span v-show="item.type=='group'">{{item.msg[item.msg.length-1].name}}:</span>
          <span v-html="replaceMsg(item.msg[item.msg.length-1].content)"></span>
        </div>
      </div>
    </router-link>
    <div class="operate-box">
      <div class="operate-unread" v-if="item.newMsgCount===0" @click="toggleMsgRead">标为未读</div>
      <div class="operate-read" v-else @click="toggleMsgRead">标为已读</div>
      <div class="operate-del" @click="deleteMsgEvent">删除</div>
    </div>
  </li>
</template>
<script type="text/ecmascript-6">
  import emojis from '@/mixins/emojis.js'

  export default {
    mixins: [emojis],
    props: ["item"],
    data() {
      return {
        deleteMsg: false
      }
    },
    methods: {
      //切换消息未读/已读状态
      toggleMsgRead(event, status) {
        //设置newMsgCount状态
        let num = this.item.newMsgCount===0 ? 1 : 0
        this.$store.commit('setMsgAttribute', {
          mid: this.item.mid,
          pro: 'newMsgCount',
          value: status==='enter' ? 0 : num,
        })

        event.target.parentNode.parentNode.firstChild.style.marginLeft = 0 + "px"
      },
      //删除消息列表
      deleteMsgEvent() {
        this.deleteMsg = true
      }
    },
    // 参考 https://vuefe.cn/v2/guide/custom-directive.html
    directives: {
      swiper: {
        bind: function (element, binding) {
          var isTouchMove, startTx, startTy
          element.addEventListener('touchstart', function (e) {
            var touches = e.touches[0]
            startTx = touches.clientX
            startTy = touches.clientY
            isTouchMove = false;
          }, false);
          element.addEventListener('touchmove', function (e) {
            var touches = e.changedTouches[0],
              endTx = touches.clientX,
              endTy = touches.clientY,
              distanceX = startTx - endTx,
              distanceY = startTy - endTy;
            if (distanceX < 0) { //右滑
              if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                if (Math.abs(distanceX) > 20) {
                  element.style.transition = "0.3s"
                  element.style.marginLeft = 0 + "px"
                }
              }
            } else { //左滑
              if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                if (distanceX < 156 && distanceX > 20) {
                  e.preventDefault()
                  element.style.transition = "0s"
                  element.style.marginLeft = -distanceX + "px"
                  isTouchMove = true
                }
              }
            }
            // e.preventDefault()
          }, false);
          element.addEventListener('touchend', function (e) {
            if (!isTouchMove) {
              return;
            }
            var touches = e.changedTouches[0],
              endTx = touches.clientX,
              endTy = touches.clientY,
              distanceX = startTx - endTx,
              distanceY = startTy - endTy,
              isSwipe = false
            if (Math.abs(distanceX) >= Math.abs(distanceY)) {
              if (distanceX < 0) {
                return;
              }
              if (Math.abs(distanceX) < 60) {
                isSwipe = true
                element.style.transition = "0.3s"
                element.style.marginLeft = 0 + "px"
              } else {
                element.style.transition = "0.3s"
                element.style.marginLeft = "-156px"
              }
            }
          }, false);
        }
      }
    }
  }
</script>
