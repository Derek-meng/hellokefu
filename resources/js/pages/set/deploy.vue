<template>
    <div class="app-container">
        <el-card class="box-card">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="网页插件" :disabled="false" name="first">开发中</el-tab-pane>
                <el-tab-pane label="聊天链接" name="second">
                    <el-alert
                            title="方式二：聊天链接"
                            type="info"
                            description="您可以在您网页中的任意按钮中放置聊天链接，客户打开链接即能与客服进行实时聊天">
                    </el-alert>
                    <el-form :inline="true" :model="form" size="mini" style="margin-top: 10px;">
                        <el-form-item label="">
                            <el-input v-model="form.url" style="width: 460px;"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onCopy">复制</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
    import { appInfo } from '../../api/app'
    const config = require('../../config')
    export default {
        data() {
            return {
                activeName: 'second',
                form:{
                    url:'url'
                }
            };
        },
        created(){
            this.init()
        },
        methods: {
            init(){
                appInfo().then(ret => {
                    this.form.url = config.host+'/#/client?app_uuid=' + ret.data.app_uuid
                }).catch()
            },
            onCopy(){
                this.$message({
                    message: '哈哈，没卵用，老实的复制吧',
                    type: 'success'
                });
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    };
</script>

<style lang="less" scoped>

</style>

