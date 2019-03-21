/**
 * 配置编译环境和线上环境
 *
 * base: 域名地址
 * websocket: socket地址
 *
 */
let base = ''
let websocket = ''

if (process.env.NODE_ENV == 'development') {
  base = '/api'
  websocket = 'ws://192.168.1.1:8888/'
} else if (process.env.NODE_ENV == 'production') {
  base = 'http://192.168.1.1:8888'
  websocket = 'ws://192.168.1.1:8888/'
}

export {
  base,
  websocket,
}
