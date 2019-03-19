const httpFetch = {
  // 需要弹出请求框的
  defaultHttp (api, url, data, callback, callback2) {
    api.post({
      url: url,
      data: data,
      success: (returnData)=>{
        callback(returnData)
      },
      always: ()=>{
        if(callback2){
          callback2()
        }
      }
    })
  },

  // 无弹出框的请求
  noIndicatorHttp (api, url, data, callback, callback2) {
    data.showIndicator = 'indicator';
    api.post({
      url: url,
      data: data,
      success: (returnData)=>{
        callback(returnData)
      },
      always: ()=>{
        if(callback2){
          callback2()
        }
      }
    })
  }
}

export default httpFetch
