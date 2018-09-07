import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [{
        path: '/',
        name: "微信",
        component: resolve => require(["@/view/wechat/Wechat.vue"], resolve)
    }, {
        path: '/wechat/dialogue',
        name: "",
        components: {
            "default": resolve => require(["@/view/wechat/Wechat.vue"], resolve),
            "subPage": resolve => require(["@/view/wechat/Dialogue.vue"], resolve)
        }
    },
    {
        path: '/wechat/dialogue/dialogue-info',
        name: "",
        components: {
            "subPage": resolve => require(["@/view/wechat/DialogueInfo.vue"], resolve)
        }
    },
    {
        path: '/wechat/dialogue/dialogue-detail',
        name: "",
        components: {
            "subPage": resolve => require(["@/view/wechat/DialogueDetail.vue"], resolve)
        }
    },
    {
        path: '/addresslist',
        name: "通讯录",
        component: resolve => require(["@/view/addressList/AddressList.vue"], resolve)
    },
    {
        path: '/addresslist/add-friend',
        name: "",
        components: {
            "default": resolve => require(["@/view/addressList/AddressList.vue"], resolve),
            "subPage": resolve => require(["@/view/addressList/AddFriend.vue"], resolve)
        }
    },
    {
        path: '/addresslist/friend-detail',
        name: "",
        components: {
            "default": resolve => require(["@/view/addressList/AddressList.vue"], resolve),
            "subPage": resolve => require(["@/view/addressList/FriendDetail.vue"], resolve)
        }
    },
    {
        path: '/addresslist/new-friends/mobile-contacts',
        name: "通讯录朋友",
        components: {
            "subPage": resolve => require(["@/view/addressList/MobileContacts.vue"], resolve)
        }
    },
    {
        path: '/addresslist/public-accounts',
        name: "",
        components: {
            "default": resolve => require(["@/view/addressList/AddressList.vue"], resolve),
            "subPage": resolve => require(["@/view/addressList/PublicAccounts.vue"], resolve)
        }
    },
    {
        path: '/addresslist/group-chat',
        name: "",
        components: {
            "default": resolve => require(["@/view/addressList/AddressList.vue"], resolve),
            "subPage": resolve => require(["@/view/addressList/GroupChat.vue"], resolve)
        }
    },
    {
        path: '/addresslist/new-friends',
        name: "",
        components: {
            "default": resolve => require(["@/view/addressList/AddressList.vue"], resolve),
            "subPage": resolve => require(["@/view/addressList/NewFriends.vue"], resolve)
        }
    }, {
        path: '/addresslist/labels',
        name: "新的朋友",
        components: {
            "default": resolve => require(["@/view/addressList/AddressList.vue"], resolve),
            "subPage": resolve => require(["@/view/addressList/Labels.vue"], resolve)
        }
    }, {
        path: '/explore',
        name: "发现",
        component: resolve => require(["@/view/explore/Explore.vue"], resolve)
    }, {
        path: '/explore/circle-friends',
        name: "朋友圈",
        components: {
            "default": resolve => require(["@/view/explore/Explore.vue"], resolve),
            "subPage": resolve => require(["@/view/explore/CircleFriends.vue"], resolve)
        }
    }, {
        path: '/self',
        name: "我",
        component: resolve => require(["@/view/self/Self.vue"], resolve)
    }, {
        path: '/self/album',
        components: { "default": resolve => require(["@/view/self/Self.vue"], resolve), "subPage": resolve => require(["@/view/self/Album.vue"], resolve) }
    },
    {
        path: '/self/setting',
        components: { "default": resolve => require(["@/view/self/Self.vue"], resolve), "subPage": resolve => require(["@/view/self/setting/Setting.vue"], resolve) }
    }, {
        path: '/self/setting/security',
        components: { "subPage": resolve => require(["@/view/self/setting/Security.vue"], resolve) }
    },
    {
        path: '/self/setting/notice',
        components: { "subPage": resolve => require(["@/view/self/setting/Notice.vue"], resolve) }
    },
    {
        path: '/self/setting/privacy',
        components: { "subPage": resolve => require(["@/view/self/setting/Privacy.vue"], resolve) }
    }, {
        path: '/self/setting/currency',
        components: { "subPage": resolve => require(["@/view/self/setting/Currency.vue"], resolve) }
    },
    {
        path: '/self/profile',
        components: { "default": resolve => require(["@/view/self/Self.vue"], resolve), "subPage": resolve => require(["@/view/self/profile/Profile.vue"], resolve) }
    }, {
        path: '/self/profile/my-qrcode',
        components: { "subPage": resolve => require(["@/view/self/profile/MyQrcode.vue"], resolve) }
    }

]
export default new Router({
    base: "/vue-wechat/",
    routes,
})
