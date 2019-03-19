import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from '@/router'
import store from '@/store'
import filters from '@/filters'
import api from '@/api'
import apiUrl from '@/api/apiUrl'
import httpAxios from '@/axios'
import localStorageHandler from '@/utils/localStorageHandler'

filters(Vue)  //全局过滤器，便于管理
Vue.config.productionTip = false  //设置为 false ,会关闭 Vue 启动时的提示信息
Vue.prototype.api = api  //api接口挂载到Vue
Vue.prototype.$apiUrl = apiUrl // 网络请求地址挂载到Vue
Vue.prototype.$http = httpAxios // 网络请求方式挂载到Vue
Vue.prototype.LSH = localStorageHandler  //挂载localStorage的操作类到Vue
FastClick.attach(document.body)  //使用 fastclick 解决移动端 300ms 点击延迟

// 全局前置守卫
//router.beforeEach((to, from, next) => {
//
//})

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body) //使用 fastclick 解决移动端 300ms 点击延迟
  }, false)
  document.addEventListener('plusready', function () {

    // 创建加载内容窗口
    let webview = plus.webview.currentWebview()
    webview.setStyle({scrollIndicator: 'none'})
    plus.screen.lockOrientation("portrait-primary")
    plus.navigator.setStatusBarStyle('dark')

    let first = false
    plus.key.addEventListener('backbutton', function () {
      webview.canBack(function (e) {
        if (e.canBack) {
          webview.back()
        } else {
          //首次按键，提示‘再按一次退出应用’
          if (!first) {
            first = true
            MintUI.Toast({
              message: '再按一次退出应用',
              position: 'middle',
              duration: 2000
            })
            setTimeout(function () {
              first = false
            }, 2000)
          } else {
            plus.runtime.quit()
          }
        }
      })
    })
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
