# vue-element-admin-base

## 介绍

基于 [PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 的后台前端继承解决方案。

文档：https://panjiachen.github.io/vue-element-admin-site/zh/guide/

## 安装与开发

### 安装

```shell
npm install --registry=https://registry.npm.taobao.org
```

### 开发

```shell
# 本地开发 启动项目
npm run dev
# 构建测试环境
npm run build:stage
# 构建生产环境
npm run build:prod
```

### 其它

```shell
# 预览发布环境效果
npm run preview
# 预览发布环境效果 + 静态资源分析
npm run preview -- --report
# 代码格式检查
npm run lint
# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

## 项目目录

```shell
├── build                      # 构建脚本配置文件
├── mock                       # mock数据
├── plop-templates             # 模板生成文件
├── public                     # 静态资源
│   │── favicon.ico            # favicon
│   └── index.html             # index.html 模板
├── src                        # 源代码
│   ├── api                    # api 服务
│   ├── assets                 # 模块等资产字体、图片 (由 webpack 处理)
│   ├── components             # 全局组件
│   ├── directive              # global directive
│   ├── filters                # global filter
│   ├── icons                  # svg icons
│   ├── lang                   # i18n language
│   ├── layout                 # global layout
│   ├── router                 # router
│   ├── store                  # store
│   ├── styles                 # global css
│   ├── utils                  # global utils
│   ├── vendor                 # vendor
│   ├── views                  # views
│   ├── App.vue                # main app component
│   ├── main.js                # app entry file
│   └── permission.js          # permission authentication
├── tests                      # tests
├── .env.xxx                   # env variable configuration
├── .eslintrc.js               # eslint config
├── .babelrc                   # babel config
├── .travis.yml                # automated CI configuration
├── vue.config.js              # vue-cli config
├── postcss.config.js          # postcss config
└── package.json               # package.json
```

## 笔记

项目笔记点击 [此处](./note/NOTE.md) 查看。
