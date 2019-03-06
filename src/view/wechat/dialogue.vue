<template>
  <div class="dialogue" @click="clickEvent">
    <header id="wx-header">
      <div class="other">
        <router-link :to="{path:'/wechat/dialogue/dialogue-detail',query: { msgInfo: msgInfo}}" tag="span"
                     class="iconfont icon-chat-friends"
                     v-show="type==='friend'"></router-link>
        <router-link :to="{path:'/wechat/dialogue/dialogue-info',query: { msgInfo: msgInfo}}" tag="span"
                     class="iconfont icon-chat-group"
                     v-show="type==='group'"></router-link>
      </div>

      <div class="center">
        <div class="iconfont icon-return-arrow" @click="$router.back()">
          <span>微信</span>
          <!--新消息个数-->
          <span v-show="$store.getters.newMsgCount>0">({{ $store.getters.newMsgCount }})</span>
        </div>

        <!--好友名称、群聊名称-->
        <span>{{pageName}}</span>
        <!--成员个数-->
        <span class="parentheses" v-show="type==='group'">{{$route.query.group_num}}</span>
      </div>
    </header>

    <section ref="msglist" class="dialogue-section clearfix" @click="menuOutsideClick">
      <template v-for="(item,index) in msgInfo.msg">
        <div class="row clearfix center" v-show="isShowTime(item, index)">
          <span class="time">{{ item.date | chatFormatTime }}</span>
        </div>
        <div class="row clearfix" :class="msgClass(item)">
          <img :src="item.headerUrl">
          <p class="text" v-html="replaceMsg(item.content)" v-more></p>
        </div>
      </template>
      <span class="msg-more" id="msg-more"><ul>
        <li>复制</li>
        <li>转发</li>
        <li>收藏</li>
        <li>删除</li>
      </ul></span>
    </section>

    <footer class="dialogue-footer">
      <div class="component-dialogue-bar-person">
        <span class="iconfont icon-dialogue-jianpan" v-show="!currentChatWay" @click="currentChatWay=true"></span>
        <span class="iconfont icon-dialogue-voice" v-show="currentChatWay" @click="currentChatWay=false"></span>
        <div class="chat-way" v-show="!currentChatWay">
          <div class="chat-say" v-press>
            <span class="chat-say-one">按住 说话</span>
            <span class="chat-say-two">松开 结束</span>
          </div>
        </div>
        <div class="chat-way" v-show="currentChatWay">
          <!--<input class="chat-txt" type="text" v-model="inputValue" @focus="focusIpt" @blur="blurIpt"/>-->
          <div ref="inputDiv" class="chat-txt" contenteditable="true" @input="changeText"></div>
        </div>
        <span class="expression iconfont icon-dialogue-smile" @click="showEmoji = !showEmoji"></span>
        <span class="more iconfont icon-dialogue-jia" v-show="inputValue.length===0"></span>
        <span class="sendButton" v-show="inputValue.length>0" @click="sendMsg">发送</span>

        <!--表情面板-->
        <div class="emojiBox" v-show="showEmoji">
          <li v-for="(item, index) in $store.getters.doneEmojis" @click="inputEmojis(item)">
            <img :src="item.file" :data="item.code" @click="inputValue += item.code">
          </li>
        </div>

        <!--语音提示-->
        <div class="recording" id="recording">
          <div class="recording-voice" id="recording-voice">
            <div class="voice-inner">
              <div class="voice-icon"></div>
              <div class="voice-volume">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <p>手指上划,取消发送</p>
          </div>
          <div class="recording-cancel" style="display: none;">
            <div class="cancel-inner"></div>
            <p>松开手指,取消发送</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script type="text/ecmascript-6">
  import util from '@/utils/util.js'
  import emojis from '@/mixins/emojis.js'

  export default {
    mixins: [emojis],
    data() {
      return {
        mid: this.$route.query.mid,
        type: this.$route.query.type,
        pageName: this.$route.query.name,
        inputValue: '',
        showEmoji: false, //显示表情面板
        currentChatWay: true, //ture为键盘打字 false为语音输入
        timer: null
      }
    },
    computed: {
      msgInfo() {
        for (let i in this.$store.state.chat.msgList) {
          if (this.$store.state.chat.msgList[i].mid == this.$route.query.mid) {
            return this.$store.state.chat.msgList[i]
          }
        }
      }
    },
    mounted() {
      //设置newMsgCount为0
      this.$store.commit('setMsgAttribute', {
        mid: this.mid,
        pro: 'newMsgCount',
        value: 0,
      })
    },
    directives: {
      press: { //长按录音事件
        inserted(element, binding) {
          // 用bind时，vue还没插入到dom,故dom获取为 undefine，用 inserted 代替 bind,也可以开个0秒的定时器
          let recording = document.querySelector('.recording'),
            recordingVoice = document.querySelector('.recording-voice'),
            recordingCancel = document.querySelector('.recording-cancel'),
            chatsayOne = document.querySelector('.chat-say-one'),
            chatsayTwo = document.querySelector('.chat-say-two'),
            startTx, startTy;

          element.addEventListener('touchstart', function (e) {
            element.className = "chat-say say-active"
            recording.style.display = recordingVoice.style.display = "block"
            chatsayOne.style.display = "none"
            chatsayTwo.style.display = "block"
            let touches = e.touches[0]
            startTx = touches.clientX
            startTy = touches.clientY
            e.preventDefault()
          }, false)
          element.addEventListener('touchend', function (e) {
            /*let touches = e.changedTouches[0];
             let distanceY = startTy - touches.clientY;
             if (distanceY > 50) {
             console.log("取消发送信息");
             }else{
             console.log("发送信息");
             }*/

            element.className = "chat-say"
            recordingCancel.style.display = recording.style.display = recordingVoice.style.display = "none"
            chatsayOne.style.display = "block"
            chatsayTwo.style.display = "none"
            e.preventDefault()
          }, false)
          element.addEventListener('touchmove', function (e) {
            let touches = e.changedTouches[0],
              endTx = touches.clientX,
              endTy = touches.clientY,
              distanceX = startTx - endTx,
              distanceY = startTy - endTy;

            if (distanceY > 50) {
              element.className = "chat-say"
              recordingVoice.style.display = "none"
              recordingCancel.style.display = "block"
            } else {
              element.className = "chat-say say-active"
              recordingVoice.style.display = "block"
              recordingCancel.style.display = "none"
            }
            // 阻断事件冒泡 防止页面被一同向上滑动
            e.preventDefault()
          }, false);
        }
      },
      more: { //长按消息菜单
        bind(element, binding) {
          let startTx, startTy
          element.addEventListener('touchstart', function (e) {
            let msgMore = document.getElementById('msg-more'),
              touches = e.touches[0];
            startTx = touches.clientX
            startTy = touches.clientY

            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                // 控制菜单的位置
                msgMore.style.left = ((startTx - 18) > 180 ? 180 : (startTx - 18)) + 'px'
                msgMore.style.top = (element.offsetTop - 33) + 'px'
                msgMore.style.display = "block"
                element.style.backgroundColor = '#e5e5e5'
              },
              500
            )
          }, false)
          element.addEventListener('touchmove', function (e) {
            let touches = e.changedTouches[0],
              disY = touches.clientY;
            if (Math.abs(disY - startTy) > 10) {
              clearTimeout(this.timer)
            }
          }, false)
          element.addEventListener('touchend', function (e) {
            clearTimeout(this.timer)
          }, false)
        }
      }
    },
    methods: {
      //消息页面击触发事件
      clickEvent(event) {
        if(event.target.className.indexOf('icon-dialogue-smile') > -1
          || event.target.className === 'emojiBox'
          || (event.target.offsetParent && event.target.offsetParent.className === 'emojiBox')){

        }else this.showEmoji = false
      },
      //解决输入法被激活时 底部输入框被遮住问题
      focusIpt() {
//        this.timer = setInterval(function () {
//          document.body.scrollTop = document.body.scrollHeight
//        }, 100)
      },
      blurIpt() {
//        clearInterval(this.timer)
      },

      //点击空白区域，菜单被隐藏
      menuOutsideClick(e) {
        let container = document.querySelectorAll('.text'),
          msgMore = document.getElementById('msg-more')
        if (e.target.className === 'text') {

        } else {
          msgMore.style.display = 'none'
//          container.forEach(item => item.style.backgroundColor = '#fff')
        }
      },

      //该消息是否需要显示日期
      isShowTime(item, index) {
        if (index === 0) return true

        let startTime = this.msgInfo.msg[index - 1].date
        let endTime = item.date
        if (Math.abs(endTime - startTime) > 3 * 60 * 1000) { //消息间隔超过3分钟显示时间
          return true
        }
        return false
      },
      //消息样式
      msgClass(item) {
        return item.sender === 'self' ? 'right-msg' : 'left-msg'
      },

      //输入表情
      inputEmojis(item) {
        this.$refs.inputDiv.innerHTML += `<img src="${item.file}" alt="${item.title}" style="width: 44px; height: 44px;vertical-align: middle;">`
        this.inputValue = this.$refs.inputDiv.innerHTML
        this.$refs.inputDiv.focus()
        this.keepLastIndex(this.$refs.inputDiv)

//        this.$refs.emojibox.style.bottom = this.$refs.ftbtn.offsetHeight + 'px' //表情面板位置随输入内容自动调整
      },
      //输入框修改内容
      changeText() {
        this.inputValue = this.$refs.inputDiv.innerHTML
//        this.$refs.emojibox.style.bottom = this.$refs.ftbtn.offsetHeight + 'px' //表情面板位置随输入内容自动调整
      },
      //发送消息
      sendMsg() {
        let params = {
          mid: this.$route.query.mid,
          item: {
            "sender": 'self',
            "type": 'text',
            "content": this.inputValue,
            "date": new Date().getTime(),
            "name": "我",
            "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/header01.png"
          }
        }
        this.$store.commit('addMsg', params)
        this.$store.commit('setMsgSort')

        this.listScrollTo()
        this.$refs.inputDiv.innerHTML = ''
        this.inputValue = ''
        this.showEmoji = false
      },

      //消息列表滚动到最底部
      listScrollTo() {
        let dom = this.$refs.msglist
        this.$nextTick(function () {
          dom.scrollTo(0, dom.scrollHeight)
        })
      },
      //输入框光标移动到最后
      keepLastIndex(el) {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        //判断光标位置，如不需要可删除
        if (sel.anchorOffset != 0) {
          return;
        }
        sel.removeAllRanges();
        sel.addRange(range);
      },
    }
  }
</script>
<style lang="less" scoped>
  @import "../../assets/less/dialogue.less";
</style>
