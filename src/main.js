import Vue from 'vue'
import vuex from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './vuex'
import filters from './filters'

//Vue.use(vuex)
Vue.config.productionTip = false //设置为 false ,会关闭 Vue 启动时的提示信息
filters(Vue) //全局过滤器，便于管理
FastClick.attach(document.body) //使用 fastclick 解决移动端 300ms 点击延迟

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
