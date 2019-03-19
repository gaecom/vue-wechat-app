import Vue from 'vue'
import VueRouter from 'vue-router'
import wechat from './wechat'
import addresslist from './addresslist'
import explore from './explore'
import self from './self'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/wechat'
  },
  //{
  //  path: '/login',
  //  name: '登陆',
  //  component: Login
  //},
  //{
  //  path: '/error',
  //  name: '错误',
  //  component: Error
  //},
  ...wechat,
  ...addresslist,
  ...explore,
  ...self,
]

export default new VueRouter({
  mode: 'hash',
  routes,
})
