const Explore = r => require.ensure([], () => r(require('@/view/explore/Explore')), 'explore')
const CircleFriends = r => require.ensure([], () => r(require('@/view/explore/CircleFriends')), 'explore')

const explore = [
  {
    path: '/explore',
    name: '发现',
    component: Explore
  },
  {
    path: '/explore/circle-friends',
    name: "朋友圈",
    components: {
      "default": Explore,
      "subPage": CircleFriends
    }
  }
]

export default explore
