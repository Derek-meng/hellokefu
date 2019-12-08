/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { sync } from 'vuex-router-sync'
import VueNativeSock from 'vue-native-websocket'
import router from './router'
import store from './store';
import './utils/permission' // Auth
import './utils/help'       // Help
import '../sass/index.scss' // global css
const unsync = sync(store, router) // done. Returns an unsync callback fn


Vue.use(ElementUI);

Vue.use(VueNativeSock, 'ws://127.0.0.1:9502', {
    // connectManually: true,
    store: store,
    format: 'json',
    reconnection: true,         // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 5,    // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 3000,    // (Number) how long to initially wait before attempting a new (1000)
    passToStoreHandler: function (eventName, event) {
        console.log('eventName',eventName)
        if (!eventName.startsWith('SOCKET_')) { return }
        let method = 'commit'
        let target = eventName.toUpperCase()
        let msg = event
        if (this.format === 'json' && event.data) {
            msg = JSON.parse(event.data)
            if (msg.mutation) {
                target = [msg.namespace || '', msg.mutation].filter((e) => !!e).join('/')
            } else if (msg.action) {
                method = 'dispatch'
                target = [msg.namespace || '', msg.action].filter((e) => !!e).join('/')
            }
        }
        this.store[method](target, msg)
    }
})

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});