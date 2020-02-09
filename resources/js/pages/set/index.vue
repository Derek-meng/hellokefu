<template>
    <div class="app-container">
        <el-card class="box-card">
            <!--第一行-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>部署</span>
                </div>
                <el-row :gutter="12">
                    <el-col :span="8">
                        <span class="set-box">
                            <a href="javascript:alert('开发中...');">
                                <i class="el-icon-attract"></i>
                                <span class="set-name">网页插件</span>
                            </a>
                        </span>
                    </el-col>
                    <el-col :span="8">
                        <span class="set-box">
                            <i class="el-icon-link"></i>
                            <router-link to="deploy-chat"> 聊天链接</router-link>
                        </span>
                    </el-col>
                </el-row>
            </el-card>
            <!--第二行-->
            <el-card class="box-card" style="margin-top: 10px;">
                <div slot="header" class="clearfix">
                    <span>会话管理</span>
                </div>
                <el-row :gutter="12">
                    <el-col :span="8">
                        <div>
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                            坐席设置
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div>
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                            通知设置
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <span class="set-box">
                            <a href="javascript:alert('开发中...');">
                                <i class="el-icon-user"></i>
                                <span class="set-name">所有访客</span>
                            </a>
                        </span>
                    </el-col>
                </el-row>
            </el-card>
            <!--第三行-->
            <el-card class="box-card" style="margin-top: 10px;">
                <div slot="header" class="clearfix">
                    <span>报表</span>
                </div>
                <el-row :gutter="12">
                    <el-col :span="8">
                        <div>
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                            访客报表
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div>
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                            坐席报表
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-card>
    </div>
</template>

<script>
    import { appInfo } from '../../api/app'
    export default {
        data() {
            return {
                dialogVisible: false,
                link: ''
            };
        },
        created(){
            this.init()
        },
        methods: {
            init(){
            },
            deployChat(){
                this.$router.push('deploy/chat')
            }
        }
    };
</script>

<style lang="less" scoped>
    .set-box {
        line-height: normal;
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
        color: #99a9bf;
        transition: color .15s linear;

        i {
            font-size: 22px;
            color: #1989FA;
        }
        .set-name {
            display: inline-block;
            padding: 0 3px;
            height: 1em;
        }
    }
</style>

