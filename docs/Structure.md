# 结构

!> 以下是项目三部分核心目录文件介绍

## Swoole 目录

聊天服务`Swoole`代码位置`app/Console/Commands/ChatWebSocket.php`

解释：此文件是「访客」与「客服」建立聊天服务服务的核心文件

## Api 接口目录

`Api`接口目录`app/Http/Controllers/Api`

接口目录树如下：

```bash
|____Controller.php
|____Auth
| |____ForgotPasswordController.php
| |____LoginController.php
| |____ResetPasswordController.php
| |____RegisterController.php
| |____VerificationController.php
|____Api
| |____UserController.php
| |____ApiController.php
| |____AuthController.php
| |____ChatController.php
| |____VisitorController.php
| |____ApplicationController.php
|____Client
| |____ChatController.php
```

## Vue 视图目录

```bash
|____App.vue
|____.DS_Store
|____layout             管理端 Layout
|____bootstrap.js       加载库文件
|____utils              辅助
| |____request.js       请求响应拦截器
| |____permission.js    路由验证文件
| |____validate.js      验证函数库
|____config.js          配置文件
|____components         组件目录
| |____Service          管理端组件目录
| |____Client.vue       访客端组件
|____api                API 目录
|____assets             静态资源目录
|____pages              视图页面目录
| |____home             默认首页
| |____404.vue          404
| |____auth             登录注册权限目录
| |____visitor          访客列表目录
| |____set              系统设置目录
| |____service          客服聊天目录
| |____client           访客页面目录
|____app.js             入口文件
|____store              状态管理目录
|____router             路由目录
```
