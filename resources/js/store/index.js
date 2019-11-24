import Vue from 'vue';
import Vuex from 'vuex';
import {getToken, setToken, destroyToken, setVisitorId, getVisitorId} from '../utils/auth'
import {profile} from "../api/auth"
import {servicerMessages, visitorMessages} from '../api/chat'
import {indexVisit} from '../api/visit'

Vue.use(Vuex);

const state = {
    socket: {
        isConnected: false,
        message: [],
        reconnectError: false,
    },
    token: getToken(),
    activeChat: [],     // 活跃访客在线列表
    visitor: null,      // 访客
    name: "",
    avatar: ""
};

const getters = {
    // token() {
    //     return state.token;
    // },
    token: state => {
        return state.token
    },
    activeChat: state => {
        return state.activeChat
    }
};

const mutations = {
    SOCKET_ONOPEN(state, event) {
        console.log('---START SOCKET_ONOPEN----')
        // console.log(store.state.route.query)
        // console.log(store.state.route.path)
        // console.log(store.state.route.params)
        Vue.prototype.$socket = event.currentTarget
        state.socket.isConnected = true
        // 访客端连接
        if (store.state.route.path === '/client') {
            let appUuid = store.state.route.query.app_uuid;
            // 访客连接 WS
            Vue.prototype.$socket.sendObj({
                body: {},
                params: {app_uuid: appUuid, vid: getVisitorId()},
                event: 'connect',
                type: 'chat'
            })
        } else {
            // 客服端连接
            Vue.prototype.$socket.sendObj({body: {}, params: {token: getToken()}, event: 'connect', type: 'user'})
        }
        console.log('---END SOCKET_ONOPEN----')
    },
    SOCKET_ONCLOSE(state, event) {
        console.log('SOCKET_ONCLOSE', state, event)
        state.socket.isConnected = false
    },
    SOCKET_ONERROR(state, event) {
        console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
        console.log('SOCKET_ONMESSAGE', message)
        // state.socket.message = message
        state.socket.message.push(message)
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
        console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
        state.socket.reconnectError = true;
    },
    // 访客消息
    SET_CLIENT_MESSAGE(state, message) {
        console.info('SET_CLIENT_MESSAGE', message)
        state.socket.message = message
    },
    SET_TOKEN: (state, token) => {
        setToken(token)
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    // 单个访客上线
    SET_VISITOR: (state, visitor) => {
        // 存储本地，并设置上线
        setVisitorId(visitor.visitor_id)
        state.visitor = visitor
        state.activeChat.push(visitor)
        console.log('====== End SET_VISITOR=======')
    },
    // 设置活跃访客
    SET_ACTIVE_CHAT: (state, chat) => {
        state.activeChat = chat
    }
};

const actions = {
    // 访客发送消息
    clientSendMessage: function (context, message) {
        let actions = {
            body: {content: message},
            params: {app_uuid: store.state.route.query.app_uuid, vid: getVisitorId()},
            event: 'send',
            type: 'chat'
        };
        Vue.prototype.$socket.sendObj(actions)
    },
    // 客服发送消息
    userSendMessage: function (context, message) {
        let actions = {
            body: {content: message},
            params: {vid: store.state.route.query.vid, token: getToken()},
            event: 'send',
            type: 'user'
        };
        Vue.prototype.$socket.sendObj(actions)
    },
    // 新访客上线
    storeVisitor: function (context, message) {
        console.log('SET_VISITOR ==>', message.data)
        context.commit('SET_VISITOR', message.data)
    },
    // 获取聊天内容
    getMessages: function (context) {
        console.log('--start get message ---')
        console.log(store.state.route.path)
        if (store.state.route.path === '/client') {
            // 访客端获取聊天消息-首次来访不拉取
            if (getVisitorId()) {
                return new Promise((resole, reject) => {
                    visitorMessages({vid: getVisitorId(), app_uuid: store.state.route.query.app_uuid}).then(ret => {
                        const messages = ret.data.reverse()
                        context.commit('SET_CLIENT_MESSAGE', messages)
                    }).catch()
                })
            }
        } else {
            // 客服端获取聊天消息-不选择会话不拉取
            if (store.state.route.query.vid) {
                return new Promise((resole, reject) => {
                    servicerMessages({vid: store.state.route.query.vid}).then(ret => {
                        console.log(ret)
                        const messages = ret.data.reverse()
                        context.commit('SET_CLIENT_MESSAGE', messages)
                    }).catch()
                })
            }
        }
    },
    // 获取活跃咨询访客
    getActiveChat: function (context) {
        let meta = {size: 5, updated_at: 'DESC'}
        indexVisit(meta).then(ret => {
            console.log('SET_ACTIVE_CHAT', ret.data)
            context.commit('SET_ACTIVE_CHAT', ret.data)
        }).catch()
    },
    // 获取客服信息
    profile({commit, state}) {
        return new Promise((resolve, reject) => {
            console.log(state.token)
            profile().then(response => {
                const {data} = response
                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                const {name, avatar} = data
                console.log(data)
                console.log(data.name)
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // destroy token
    resetToken({commit}) {
        return new Promise(resolve => {
            commit('SET_TOKEN', null)
            destroyToken()
            resolve()
        })
    }
}


const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;