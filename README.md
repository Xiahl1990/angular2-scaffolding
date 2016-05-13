# angular2-scaffolding
angular2@2.0.0-beta.16 + Webpack + karma + protractor + tslint。包含了项目框架结构，多级路由，ajax注入以及校验模块等。

# 安装（建议将npm源配置到国内淘宝镜像）
```bash
* step1> npm install typings webpack-dev-server rimraf webpack karma-cli protractor typescript -g
* step2> npm install
* step3> typings install
* step4> npm run server
```

# 编译
```bash
## 开发环境
npm run build:dev
npm run server

## 生产环境
npm run build:prod
npm run server:prod
```