const AddressList = r => require.ensure([], () => r(require('@/view/addressList/AddressList')), 'addresslist')
const AddFriend = r => require.ensure([], () => r(require('@/view/addressList/AddFriend')), 'addresslist')
const FriendDetail = r => require.ensure([], () => r(require('@/view/addressList/FriendDetail')), 'addresslist')
const NewFriends = r => require.ensure([], () => r(require('@/view/addressList/NewFriends')), 'addresslist')
const MobileContacts = r => require.ensure([], () => r(require('@/view/addressList/MobileContacts')), 'addresslist')
const GroupChat = r => require.ensure([], () => r(require('@/view/addressList/GroupChat')), 'addresslist')
const Labels = r => require.ensure([], () => r(require('@/view/addressList/Labels')), 'addresslist')
const PublicAccounts = r => require.ensure([], () => r(require('@/view/addressList/PublicAccounts')), 'addresslist')

const addresslist = [
  {
    path: '/addresslist',
    name: '通讯录',
    component: AddressList
  },
  {
    path: '/addresslist/add-friend',
    name: "添加朋友",
    components: {
      "default": AddressList,
      "subPage": AddFriend
    }
  },
  {
    path: '/addresslist/friend-detail',
    name: "详细资料",
    components: {
      "default": AddressList,
      "subPage": FriendDetail
    }
  },
  {
    path: '/addresslist/new-friends',
    name: "新的朋友",
    components: {
      "default": AddressList,
      "subPage": NewFriends
    }
  },
  {
    path: '/addresslist/new-friends/mobile-contacts',
    name: "通讯录朋友",
    components: {
      "subPage": MobileContacts
    }
  },
  {
    path: '/addresslist/group-chat',
    name: '群聊',
    components: {
      "default": AddressList,
      "subPage": GroupChat
    }
  },
  {
    path: '/addresslist/labels',
    name: '标签',
    components: {
      "default": AddressList,
      "subPage": Labels
    }
  },
  {
    path: '/addresslist/public-accounts',
    name: '公众号',
    components: {
      "default": AddressList,
      "subPage": PublicAccounts
    }
  }
]

export default addresslist
