/* hbuilder H5+ 操作方法封装 */

const hbuilder = {
  //获取设备信息
  getDeviceConfig(plus) {
    let obj = {};
    obj.imei = plus.device.imei;//设备的国际移动设备身份码
    obj.imsi = plus.device.imsi;//设备的国际移动用户识别码
    obj.model = plus.device.model;//设备的型号
    obj.vendor = plus.device.vendor;//设备的生产厂商
    obj.uuid = plus.device.uuid;//设备的唯一标识
    obj.appid = plus.runtime.appid;//当前应用的APPID
    obj.launcher = plus.runtime.launcher;//应用启动来源
    obj.origin = plus.runtime.origin;//应用安装来源
    obj.version = plus.runtime.version;//客户端的版本号
    obj.innerVersion = plus.runtime.innerVersion;//客户端5+运行环境的版本号
    obj.launchLoadedTime = plus.runtime.launchLoadedTime;//获取当前应用首页加载的时间
    obj.processId = plus.runtime.processId;//获取当前应用的进程标识
    return obj
  },

  /**
   * 下载文件到本地 并 打开文件
   * 1.如果本地存在,则从本地直接获取
   * 2.如果本地不存在则联网下载,缓存到本地
   *
   * imgUrl 图片访问地址（绝对路径）
   * downloadPath 图片存储在手机中_downloads下的某文件夹
   */
  fileDownloadOpen(imgUrl, downloadPath='') {
    if(!imgUrl) return;
    //Indicator.open({
    //  text: '加载中...',
    //  spinnerType: 'fading-circle'
    //})

    //文件下载成功 默认保存在本地相对路径的"_downloads/${downloadPath}"文件夹里面, 如"_downloads/${downloadPath}/logo.jpg"
    let filename = imgUrl.substring(imgUrl.lastIndexOf("/") + 1, imgUrl.length);
    let relativePath = `_downloads${downloadPath}/${filename}`; //参数downloadPath必须带有/ 如：'/attach'
    //检查文件是否已存在
    plus.io.resolveLocalFileSystemURL(relativePath, entry => { //如果文件存在,则直接获取本地文件
      console.log("文件已存在=" + relativePath);
      setImgFromLocal(relativePath);
    }, e => { //如果文件不存在,联网下载文件
      console.log("文件不存在,联网下载=" + relativePath);
      setImgFromNet(imgUrl,relativePath);
    });

    //setTimeout(() => {
    //  Indicator.close()
    //}, 3000)
  },

}

export default hbuilder



// 获取本地文件
// relativePath 本地相对路径 例如:"_downloads/${downloadPath}/logo.jpg"
function setImgFromLocal(relativePath) {
  //Indicator.close()
  //本地相对路径("_downloads/${downloadPath}/logo.jpg")转成SD卡绝对路径("/storage/emulated/0/Android/data/com.ccb.essc/downloads/logo.jpg");
  //let sd_path = plus.io.convertLocalFileSystemURL(relativePath);
  //console.log('SD卡绝对路径：'+sd_path)

  plus.runtime.openFile(relativePath);  // 打开下载的文件
}
// 联网下载文件
function setImgFromNet(imgUrl,relativePath) {
  //创建下载任务
  let dtask = plus.downloader.createDownload(imgUrl, {
    method: 'GET',
    filename: relativePath
  }, (d, status) => {
    //Indicator.close()
    if (status == 200) { //下载成功
      console.log('下载成功：'+d.filename)
      setImgFromLocal(d.filename);
    } else { //下载失败,需删除本地临时文件,否则下次进来时会检查到文件已存在
      console.log('下载失败')
      //dtask.abort();//文档描述:取消下载,删除临时文件;(但经测试临时文件没有删除,故使用delFile()方法删除);
      if (!relativePath) delFile(relativePath);
    }
  });
  //启动下载任务
  dtask.start();
}
//删除指定文件
function delFile(relativePath) {
  plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
    entry.remove(function(entry) {
      console.log("文件删除成功==" + relativePath);
    }, function(e) {
      console.log("文件删除失败=" + relativePath);
    });
  });
}
