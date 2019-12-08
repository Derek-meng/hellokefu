<template>
    <div class="list">
        <ul>
            <li v-for="item in activeChat" :class="{ active: item.visitor_id === active }"
                @click="selectHandle(item.visitor_id)">
                <el-badge :value="item.unread" :max="99" :hidden="item.unread === 0" class="item">
                    <img class="avatar" width="30" height="30" :alt="item.name" :src="item.avatar">
                </el-badge>
                <p class="name">{{item.name}}</p>
                <span class="time">{{item.lasted_at}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                active: '',
            }
        },
        computed: {
            activeChat(){
                return this.$store.state.activeVisitor
            }
        },
        created() {
            this.active = this.$route.query.vid
            this.init()
        }
        ,
        watch: {
            '$route'(to, from) {
                this.active = to.query.vid
            }
        }
        ,
        methods: {
            // 访客列表
            init() {
                this.$store.dispatch('getActiveChat')
            }
            ,
            // 查看选中
            selectHandle(vid) {
                this.$router.push({path: '/service', query: {vid: vid}})
            }
        }
    }
    ;
</script>
<style scoped lang="less">
    .list {
        height: 600px;
        border: solid 1px #EBEBEB;

        li {
            padding: 12px 15px;
            border-bottom: 1px solid #EBEBEB;
            cursor: pointer;
            transition: background-color .1s;

            &:hover {
                background-color: #E7E7E7;
                border-left: 2px solid #31449E;
            }
            &.active {
                background-color: #E7E7E7;
                border-left: 2px solid #31449E;
            }
        }
        .avatar, .name {
            vertical-align: middle;
        }
        .avatar {
            border-radius: 2px;
        }
        .name {
            display: inline-block;
            margin: 0 0 0 15px;
        }
        .time {
            float: right;
            margin: 15px;
            font-size: 13px;
        }
    }
</style>