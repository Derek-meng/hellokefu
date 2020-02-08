# 安装

## Docker 安装

> 开发环境下，推荐使用此方式进行快速安装，避免再安装时遇到阻碍，当然如果`Docker`对你来说是个问题，而`Laravel`不是，采用下面「分步安装」也是可以的。

安装步骤：

```bash

```

## 分步安装

在开始开始安装项目前，基础服务`Nginx`或`Apache`、`MySQL`、`PHP`的安装这里我就不再啰嗦了，根据自个系统平台选择单个安装服务还是一键集成包均可，接下来我们进入正式`Run`起项目的步骤。

第一步：克隆项目包

```bash
git clone https://github.com/dbing/hellokefu.git
```

第二步：安装项目依赖

```bash
cd hellokefu && composer install
```

第三步：修改`.env`数据库配置

```bash
cp .env.example .env
```

以下是我的关于数据库配置清单:

```.env
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=hello_kefu
DB_PREFIX=hello_
DB_USERNAME=root
DB_PASSWORD=root
```

第四步：执行迁移数据库

```bash
php artisan migrate --seed
```

第五步：安装前端依赖，并打包生成前端静态资源

打包前，先修改一下连接到`WebSocket`服务的`IP`地址和`Port`端口号，在`resources/js/config.js`文件。修改完成后再使用`npm`或`yarn`打包，这里给出`npm`命令:

安装依赖

```bash
npm install
```

```bash
npm run watch
```

第六步：配置虚拟主机完成访问

再配置前，我们先生成必要的秘钥信息，生成`jwt`加密串和项目`APP_KEY`，命令如下：

```bash
php artisan key:generate
php artisan jwt:secret
```

添加虚拟主机并绑定到项目`public`，如果是本地域名，并添加本地`hosts`域名解析，比如域名为：`dev.hellokefu.com`。

`Mac`和`Linux`下，`vim /etc/hosts`打开添加一行解析记录如下：

```bash
127.0.0.1 dev.hellokefu.com
```

如果是 `nginx` 记得添加重写规则:

```nginx.conf
location / {
    try_files $uri $uri/ /index.php$is_args$args;
}
```

完成后，访问`dev.hellokefu.com`，如可以正常跳转到登录页，那么恭喜你完成项目的搭建，如遇问题请[留言](https://github.com/dbing/hellokefu/issues)。

!> 访客与客服聊天前，还需启动如下服务

```bash
php artisan swoole:chat
```
