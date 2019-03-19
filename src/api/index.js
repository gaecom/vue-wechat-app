import $axios from 'axios'
import $router from '@/router'
import $store from '@/store'
import '@/api/interceptor'
import localStorageHandler from '@/utils/localStorageHandler'
import global from '@/global'

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
    // 默认的成功处理
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
    errorSelect(err);
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

// 自定义方法
// 格式化get请求的参数
function paramsFormat(params) {
  let str = '?'
  for (let i in params) {
    str += `&${i}=${params[i]}`
  }
  str = str.replace(/&/, '')
  return str
}

// 请求失败处理
function errorSelect(errorInfo) {
  let error;
  let msg;
  let cbt = "返回";
  if (errorInfo.response) {
    if (errorInfo.response.data) {
      error = errorInfo.response.data.error
      if (error === "invalid_token") {
        // msg = errorInfo.response.data.error;
        msg = "登录超时，请重新登录！";
        // $store.dispatch('logOut');
        // $store.dispatch('setLoginState', false);
        // $store.dispatch('clearResource');
        // $store.dispatch('setToken', '');
        // $store.dispatch('setWebToken', '');
        // localStorageHandler.delItem("Token")
        // console.log(msg)
      } else {
        if (process.env.NODE_ENV == 'production' && isChange == '02') {
          msg = '服务器开小差了，稍后再试吧~';
        } else {
          msg = errorInfo.response.data;
        }
        // console.log(msg)
      }
    } else {
      msg = '网络异常';
      // console.log(msg)
    }
  } else {
    // msg = '请求网络超时';
    msg = '服务器开小差了，稍后再试吧~';
  }
  MessageBox({
    title: '提示',
    message: msg,
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: cbt,
  }).then(action => {
    if (error && error === "invalid_token") {
      // if ($store.state.users.channel) {
      //   // web页面单点 不做页面跳转
      // } else {
      //   $router.push({
      //     path: '/login',
      //   });
      // }
    }
    MessageBox.close();
  })

}
