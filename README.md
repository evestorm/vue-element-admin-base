# ADL 平台

## 介绍

基于 [PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 的后台前端继承解决方案。

文档：<https://panjiachen.github.io/vue-element-admin-site/zh/guide/>

## 安装与开发

### 安装

```shell
npm install --registry=https://registry.npm.taobao.org
```

### VSCode 插件安装

务必安装项目根目录下 `.vscode/extensions.json` 中的所有推荐 VSCode 插件。

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
│   ├── directive              # 全局指令
│   ├── filters                # 全局过滤器
│   ├── icons                  # svg icons
│   ├── lang                   # 国际化（已删除）
│   ├── layout                 # 全局布局
│   ├── router                 # 路由
│   ├── store                  # vuex
│   ├── styles                 # 全局css
│   └── styles                 # 全局css
│     ├── btn.scss                 # 按钮样式
│     ├── element-ui.scss          # 全局自定义 element-ui 样式
│     ├── element-variables        # 覆盖 element-ui 默认主题样式
│     ├── index.scss               # 全局通用样式
│     ├── mixin.scss               # 全局mixin
│     ├── sidebar.scss             # sidebar css
│     ├── transition.scss          # vue transition 动画
│     └── variables.scss           # 全局变量
│   ├── utils                  # 全局工具
│   ├── vendor                 # 三方插件
│   ├── views                  # 视图
│   ├── App.vue                # 主要应用程序组件
│   ├── main.js                # 入口文件
│   ├── permission.js          # 权限认证
│   └── settings.js            # 默认配置
├── tests                      # 测试
├── .env.xxx                   # 环境变量
├── .eslintignore              # eslint 白名单
├── .eslintrc.js               # eslint 配置
├── .babelrc                   # babel 配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```

## 项目编写要求

### 页面 & 组件

起名格式举例：

页面：错误日志 - `error-log.vue`

单词之间 `-` 隔开。新建 vue 文件完毕后输入 `vue` 按 tab 回车生成 vue 页面的模板。
并将 `script` 标签内的 js 放入和组件名相同的 js 文件中。scss 放入和组件名相同的 scss 文件中。

组件：详细对话框 - `DetailDialog`

首字母大写且驼峰命名，为的是与页面进行区分。vue 文件中输入 `comp` 按 tab 回车生成 vue 组件的模板。
同时也需要对 vue 文件进行拆分。

> error-log.vue

```html
<template>
  <div class="app-container error-log">
    <!-- 子组件 -->
    <sub-comp></sub-comp>
  </div>
</template>

<script src="./error-log.js"></script>
<style lang="scss" scoped>
  @import "./error-log.scss"; // 引入scss类
</style>
```

> error-log.js

```js
// 引入 vuex
import { mapGetters, mapActions, mapMutations } from "vuex";
// api 网络请求
import article from "@/api/article";
// 组件
import SubComp from "@/components/sub-comp/sub-comp.vue";

export default {
  name: "ErrorLog",
  data() {
    return {
      title: "标题",
    };
  },
  // 组件
  components: {
    SubComp,
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    console.log("create");
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  async mounted() {
    this.SET_NAME("lance");
    console.log(this.getName);
    this.getNewsInfo({ pageIndex: 1, pageSize: 10, siteArticleType: "10" });
    const result = await article.fetchList();
    console.log(result);
  },
  // 计算属性
  computed: {
    ...mapGetters("demo", ["getName"]), // 「store/modules/demo 中的 getter」
    ...mapGetters(["token"]), // 「store/getters.js 中的getter」
  },
  // 过滤
  filters: {
    parseScene: function (value) {
      return value + "123";
    },
  },
  // 方法
  methods: {
    ...mapMutations("demo", ["SET_NAME"]),
    ...mapActions("demo", ["getNewsInfo"]),
  },
  // 监听
  watch: {
    name: {
      immediate: true, // 立即执行
      deep: true, // 深度监听
      handler(newValue, oldValue) {
        // TODO
      },
    },
  },
};
```

> error-log.scss

```css
/* TODO */
```

### 页面 or 组件中的 name 必填

在编写路由 router 和路由对应的 view component 的时候一定要确保 两者的 name 是完全一致的，推荐 name 名和页面 or 组件的文件名相同

**DEMO:**

```js
//router 路由声明
{
  path: 'create-form',
  component: ()=>import('@/views/form/create'),
  name: 'create-form',
  meta: { title: 'createForm', icon: 'table' }
}
//路由对应的view  form/create
export default {
  name: 'create-form'
}
```

一定要保证两者的名字相同，切记写重或者写错。

### 组件位置

通用组件全部放进 `src/components/` 下。页面独有组件放在页面下的 `components` 文件夹。类似：

```shell
home
├── components # home页面特有组件放此处
│   ├── home-comp
│   │   ├── home-comp.js
│   │   ├── home-comp.scss
│   │   └── home-comp.vue
│   └── sub-demo
│       ├── sub-demo.js
│       ├── sub-demo.scss
│       └── sub-demo.vue
├── home.js
├── home.scss
└── home.vue
```

### git commit

提交代码时评论遵循以下要求：

```shell
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```

**示例**

```shell
git commit -m 'feat: 添加首页'
git commit -m 'fix: 修改状态不更新bug,issue编号：XXX'
```

## 登录

username: admin
password: 111111

## feature

1. 必须得账号登录

2. 侧边栏路由的生成机制是：后端返回的 menu 中的路由字段 === 项目路由中的 code 字段，所以得在 src/store/modules/permission.js 的 hasPermission 方法做更改
