const Self = r => require.ensure([], () => r(require('@/view/self/Self')), 'self')
const Profile = r => require.ensure([], () => r(require('@/view/self/profile/Profile')), 'self')
const MyQrcode = r => require.ensure([], () => r(require('@/view/self/profile/MyQrcode')), 'self')
const Album = r => require.ensure([], () => r(require('@/view/self/Album')), 'self')

const Setting = r => require.ensure([], () => r(require('@/view/self/setting/Setting')), 'self')
const Security = r => require.ensure([], () => r(require('@/view/self/setting/Security')), 'self')
const Notice = r => require.ensure([], () => r(require('@/view/self/setting/Notice')), 'self')
const Privacy = r => require.ensure([], () => r(require('@/view/self/setting/Privacy')), 'self')
const Currency = r => require.ensure([], () => r(require('@/view/self/setting/Currency')), 'self')

const self = [
  {
    path: '/self',
    name: '我',
    component: Self
  },
  {
    path: '/self/profile',
    name: "个人信息",
    components: {
      "default": Self,
      "subPage": Profile
    }
  },
  {
    path: '/self/profile/myqrcode',
    name: "我的二维码",
    components: {
      "subPage": MyQrcode
    }
  },
  {
    path: '/self/album',
    name: "相册",
    components: {
      "default": Self,
      "subPage": Album
    }
  },
  {
    path: '/self/setting',
    name: "设置",
    components: {
      "default": Self,
      "subPage": Setting
    }
  },
  {
    path: '/self/setting/security',
    name: '账号与安全',
    components: {
      "subPage": Security
    }
  },
  {
    path: '/self/setting/notice',
    name: '新消息通知',
    components: {
      "subPage": Notice
    }
  },
  {
    path: '/self/setting/privacy',
    name: '隐私',
    components: {
      "subPage": Privacy
    }
  },
  {
    path: '/self/setting/currency',
    name: '通用',
    components: {
      "subPage": Currency
    }
  },
]

export default self
