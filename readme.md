
<p align="center"><img src="https://github.com/dbing/hellokefu/raw/master/public/logo.png" height="150" width="150"></p>

# Hello chat

## 效果图

<p align="center"><img src="https://github.com/dbing/hellokefu/raw/master/public/screen/server.png"></p>
<p align="center"><img src="https://github.com/dbing/hellokefu/raw/master/public/screen/client.png"></p>


[中文文档](http://docs.hellokefu.com/)

## Usage
```
git clone https://github.com/dbing/hellokefu.git <project-name>
```
```
cd <project-name>
```
```
composer install
```
```
cp .env.example .env
```
```
php artisan key:generate
```
```
php artisan jwt:secret
```
```
php artisan migrate --seed
```
```
php artisan serve (if not using laravel valet)
```
```
yarn OR npm install
```
```
yarn watch OR npm run watch
```

Visit `http://localhost:8000`, It works!

```
If using laravel valet, visit http://<project-name>.test
```

Now you're ready to start coding!

## More
