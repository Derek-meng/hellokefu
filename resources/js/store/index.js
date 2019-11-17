import Vue from 'vue';
import Vuex from 'vuex';
import {getToken, setToken, destroyToken, visitor} from '../utils/auth'
import {profile} from "../api/auth"
import {servicerMessages, visitorMessages} from '../api/chat'

Vue.use(Vuex);

const state = {
    socket: {
        isConnected: false,
        message: [],
        reconnectError: false,
    },
    token: getToken(),
    // clientMessage: [],
    // serviceMessage: [],
    name: "",
    avatar: ""
};

const getters = {
    token() {
        return state.token;
    }
    // avatar: state => state.user.avatar,
};

const mutations = {
    SOCKET_ONOPEN(state, event) {
        console.log('---start onpen----')
        // current path (string)
        // current params
        console.log(store.state.route.query)
        // current query (object)
        // console.log(store.state.route.path)
        // console.log(store.state.route.params)
        // Vue.prototype.$socket = event.currentTarget
        state.socket.isConnected = true
        // connect
        if (store.state.route.path !== '/client') {
            var actions = {body: {}, params: {token: getToken()}, event: 'connect', type: 'user'};
        } else {
            let appUuid = store.state.route.query.app_uuid;
            console.log('uuid', appUuid);
            var actions = {body: {}, params: {app_uuid: appUuid, vid: visitor()}, event: 'connect', type: 'chat'};
        }

        // connect
        Vue.prototype.$socket.sendObj(actions)
        console.log('---end onopen----')
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
        console.log('-- SOCKET_ONMESSAGE ---')
        // state.socket.message = message
        console.log(state.socket.message)
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
        console.info('set client messages', message)
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
    }
};

const actions = {
    sendMessage: function (context, message) {
        Vue.prototype.$socket.send(message)
    },
    // 获取聊天内容
    getMessages: function (context) {
        console.log('--start get client message ---')
        console.log(store.state.route.path)
        if (store.state.route.path === '/client') {
            console.log('visit messages')
            // 访客端消息
            return new Promise((resole, reject) => {
                visitorMessages({vid: visitor(), app_uuid: store.state.route.query.app_uuid}).then(ret => {
                    console.log(ret)
                    const messages = ret.data.reverse()
                    context.commit('SET_CLIENT_MESSAGE', messages)
                    console.log('messages', messages)
                }).catch()
            })
        } else {
            console.log('user messages')
            // 客服端消息
            return new Promise((resole, reject) => {
                servicerMessages({vid: store.state.route.query.vid}).then(ret => {
                    console.log(ret)
                    const messages = ret.data.reverse()
                    context.commit('SET_CLIENT_MESSAGE', messages)
                    console.log('messages', messages)
                }).catch()
            })
        }
    },
    // get user profile
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