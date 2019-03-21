import $axios from 'axios'
import $router from '@/router'
import $store from '@/store'
import '@/api/interceptor'
import localStorageHandler from '@/utils/localStorageHandler'
import global from '@/global'
import { base, websocket } from '@/config/env'

const Api = {
  then(res, success, warn) {
    if (res.resultCode === global.RESULT_SUCCESS) {
      // 成功
      success(res.resultData, res)
    } else if ([global.RESULT_ERROR_PARAM, global.RESULT_ERROR_PARAM,
        global.RESULT_ERROR_PARAM,global.RESULT_ERROR_PARAM].includes(res.resultData)) {
      // 异常处理

    } else {
      // 接口调用成功，并且参数不满足后台需求，接下来的警告提醒
      let msg = res.resultMsg ? res.resultMsg : '系统异常，请稍后重试'
      warn(msg, res)
    }
  },
  // 成功分支
  success(data, res) {
    console.log('默认成功的处理:', data)
    console.log('默认成功的处理:', res)
  },
  // 警告分支
  warn(msg, res) {
    console.log('默认的警告处理:', msg)
    console.log('默认的警告处理:', res)
  },
  // 失败分支
  error(err) {
    console.log(err)

  },
  // 不管成功和失败都进入的分支
  always(res) {

  },

  // post请求
  post({
         url = '',
         data = {},
         success = this.success,
         warn = this.warn,
         error = this.error,
         always = this.always
       }) {
    $axios.post(`${base}${url}`, data)
      .then((res) => {
        this.then(res, success, warn)
        always(res)
      })
      .catch((err) => {
        error(err)
        always(err)
      })
  },

  // get请求
  get({
        url = '',
        params = {},
        success = this.success,
        warn = this.warn,
        error = this.error,
        always = this.always
      }) {
    $axios.get(`${base}${url}${paramsFormat(params)}`)
      .then((res) => {
        this.then(res, success, warn)
        always(res)
      })
      .catch((err) => {
        error(err)
        always(err)
      })
  },
  // put请求
  put({
        url = '',
        data = {},
        success = this.success,
        warn = this.warn,
        error = this.error,
        always = this.always
      }) {
    $axios.put(`${base}${url}`, data)
      .then((res) => {
        this.then(res, success, warn)
        always(res)
      })
      .catch((err) => {
        error(err)
        always(err)
      })
  },
  // -delete请求
  delete({
           url = '',
           data = {},
           success = this.success,
           warn = this.warn,
           error = this.error,
           always = this.always
         }) {
    $axios.delete(`${base}${url}`, {data: data})
      .then((res) => {
        this.then(res, success, warn)
        always(res)
      })
      .catch((err) => {
        error(err)
        always(err)
      })
  },
  $axios    // 把axios挂载到 Api接口上，用于Vue实例内对axios进行全局配置
}

export default Api


// 自定义方法 格式化get请求的参数
function paramsFormat(params) {
  let str = '?'
  for (let i in params) {
    str += `&${i}=${params[i]}`
  }
  str = str.replace(/&/, '')
  return str
}
