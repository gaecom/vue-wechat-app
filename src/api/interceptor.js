import axios from 'axios'
import store from '@/store'

axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 超时时间
axios.defaults.timeout = 60000

// http请求拦截器
axios.interceptors.request.use(
  (config) => {
    //if(config.data.showIndicator === 'indicator'){
    //
    //}else {
    //  Indicator.open({
    //    text: '加载中...',
    //    spinnerType: 'fading-circle'
    //  });
    //}

    return config
  },
  (error) => {
    // console.info('对请求错误做些什么')
    //Indicator.close();
    return Promise.reject(error)
  })

// http响应拦截器
axios.interceptors.response.use(
  (res) => {
    //Indicator.close();
    const {data = {}} = res
    return data
  },
  (error) => {
    //Indicator.close();
    return Promise.reject(error)
  })


