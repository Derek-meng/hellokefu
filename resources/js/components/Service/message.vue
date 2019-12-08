<template>
    <div class="main-content">
        <div class="message">
            <ul v-if="messages">
                <div class="header">中国.上海.上海</div>

                <li v-for="item in messages">
                    <p class="time">
                        <span>{{ item.created_at | time }}</span>
                    </p>
                    <div class="main" :class="{ self: item.agent === 'user'}">
                        <img class="avatar" width="30" height="30"
                             :src="item.agent === 'user' ? item.user.avatar : item.visitor.avatar"/>
                        <div class="text">{{ item.content }}</div>
                    </div>
                </li>
            </ul>
        </div>
        <!--聊天窗-->
        <div class="talk-text">
            <textarea placeholder="在这里输入，按 Enter 发送" v-model="content" @keyup="onKeyup"></textarea>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                content: ''
            }
        },
        filters: {
            // 将日期过滤为 hour:minutes
            time(date) {
                if (typeof date === 'string') {
                    date = new Date(date);
                }
                return date.getHours() + ':' + date.getMinutes();
            }
        },
        computed: {
            messages() {
                console.log('----message----')
                console.log(this.$store.getters.getFilterMessages)
                return this.$store.getters.getFilterMessages
            }
        },
        created() {
            this.init()
        },
        watch: {
            '$route'(to, from) {
                // 获取聊天记录
                this.$store.dispatch('getMessages')
            }
        },
        methods: {
            init() {
                this.$store.dispatch('getMessages')
            },
            onKeyup(e) {
                if (e.keyCode === 13 && this.content.length) {
                    // 发送消息
                    this.$store.dispatch('userSendMessage', this.content)
                    this.content = '';
                }
            }
        }
    };
</script>
<style lang="less" scoped>
    .main-content {
        .message {
            padding: 10px 15px;
            /*overflow-y: scroll;*/
            overflow: auto;
            border: solid 1px #EBEBEB;
            height: 600px;
            /*height: ~'calc(100% - 860px)';*/
            li {
                margin-bottom: 15px;
            }
            .header {
                text-align: center;
                background-color: #F3F3F3;
                height: 40px;
                line-height: 40px;
            }
            .time {
                margin: 7px 0;
                text-align: center;

                > span {
                    display: inline-block;
                    padding: 0 18px;
                    font-size: 12px;
                    color: #fff;
                    border-radius: 2px;
                    background-color: #dcdcdc;
                }
            }
            .avatar {
                float: left;
                margin: 0 10px 0 0;
                border-radius: 3px;
            }
            .text {
                display: inline-block;
                position: relative;
                padding: 0 10px;
                max-width: ~'calc(100% - 40px)';
                min-height: 30px;
                line-height: 2.5;
                font-size: 12px;
                text-align: left;
                word-break: break-all;
                /*background-color: #fafafa;*/
                background-color: #F3F3F3;
                border-radius: 4px;

                &:before {
                    content: " ";
                    position: absolute;
                    top: 9px;
                    right: 100%;
                    border: 6px solid transparent;
                    border-right-color: #F3F3F3;
                }
            }

            .self {
                text-align: right;

                .avatar {
                    float: right;
                    margin: 0 0 0 10px;
                }
                .text {
                    background-color: #b2e281;

                    &:before {
                        right: inherit;
                        left: 100%;
                        border-right-color: transparent;
                        border-left-color: #b2e281;
                    }
                }
            }
        }
        /* 聊天 */
        .talk-text {
            /*position: absolute;*/
            width: 100%;
            bottom: 0;
            left: 0;

            height: 160px;
            border: solid 1px #ddd;
            border-top: none;

            textarea {
                padding: 10px;
                height: 100%;
                width: 100%;
                border: none;
                outline: none;
                font-family: "Micrsofot Yahei";
                resize: none;
            }
        }
    }

</style>