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
        component: resolve => require(["@/components/explore/explore.vue"], resolve)
    }, {
        path: '/explore/moments',
        name: "朋友圈",
        components: {
            "default": resolve => require(["@/components/explore/explore.vue"], resolve),
            "subPage": resolve => require(["@/components/explore/moments.vue"], resolve)
        }
    }, {
        path: '/self',
        name: "我",
        component: resolve => require(["@/components/self/self.vue"], resolve)
    }, {
        path: '/self/album',
        components: { "default": resolve => require(["@/components/self/self.vue"], resolve), "subPage": resolve => require(["@/components/common/album.vue"], resolve) }
    },
    {
        path: '/self/settings',
        components: { "default": resolve => require(["@/components/self/self.vue"], resolve), "subPage": resolve => require(["@/components/self/settings.vue"], resolve) }
    }, {
        path: '/self/settings/security',
        components: { "subPage": resolve => require(["@/components/self/settings/security.vue"], resolve) }
    },
    {
        path: '/self/settings/notice',
        components: { "subPage": resolve => require(["@/components/self/settings/notice.vue"], resolve) }
    },
    {
        path: '/self/settings/privacy',
        components: { "subPage": resolve => require(["@/components/self/settings/privacy.vue"], resolve) }
    }, {
        path: '/self/settings/common',
        components: { "subPage": resolve => require(["@/components/self/settings/common.vue"], resolve) }
    },
    {
        path: '/self/profile',
        components: { "default": resolve => require(["@/components/self/self.vue"], resolve), "subPage": resolve => require(["@/components/common/profile.vue"], resolve) }
    }, {
        path: '/self/profile/my-qrcode',
        components: { "subPage": resolve => require(["@/components/self/my-qrcode.vue"], resolve) }
    }, {
        path: '/self/settings',
        components: { "subPage": resolve => require(["@/components/settings/settings.vue"], resolve) }
    },
    {
        path: '/self/settings/common',
        components: {
            "subPage": resolve => require(["@/components/settings/common/common.vue"], resolve)
        }
    },
    {
        path: '/self/settings/common/language',
        components: {
            "subPage": resolve => require(["@/components/settings/common/language.vue"], resolve)
        }
    }

]
export default new Router({
    base: "/vue-wechat/",
    routes,
})
