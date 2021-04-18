import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/* Router Modules */
import componentsRouter from "@/router/modules/components"; // 组件二级路由
import chartsRouter from "@/router/modules/charts"; // 图表二级路由
import tableRouter from "@/router/modules/table"; // 表格二级路由
import nestedRouter from "@/router/modules/nested"; // 嵌套多级路由
import demoRouter from "@/router/modules/demo"; // 各种demo使用

/**
 * 子菜单 sub-menu 只出现在 children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 *                                当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                若你想不管路由下面的 children 声明的个数都显示你的根路由
 * redirect: noRedirect           当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    设置该路由进入的权限，支持多个权限叠加
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'/'el-icon-x' 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
    noCache: true                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix: true                  如果设置为true，它则会固定在tags-view中(默认 false)
    breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    activeMenu: '/example/list'  当路由设置了该属性，则会高亮相对应的侧边栏。
                                 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
                                 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
                                  activeMenu: '/article/list'
  }
 */

/**
 * constantRoutes
 * 不需要权限就能访问的基本路由
 * 所有的角色都可以访问
 */
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/auth-redirect", // 社交登录
    component: () => import("@/views/login/auth-redirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/home.vue"),
        name: "Home",
        meta: { title: "首页", icon: "dashboard", affix: true, noCache: true },
      },
    ],
  },
  {
    path: "/documentation",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/documentation/index"),
        name: "Documentation",
        meta: { title: "文档", icon: "documentation", affix: true },
      },
    ],
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/guide/index"),
        name: "Guide",
        meta: { title: "向导", icon: "guide", noCache: true },
      },
    ],
  },
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: () => import("@/views/profile/index"),
        name: "Profile",
        meta: { title: "简介", icon: "user", noCache: true },
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/page",
    alwaysShow: true, // will always show the root menu
    name: "Permission",
    meta: {
      title: "权限",
      icon: "lock",
      roles: ["admin", "editor"], // you can set roles in root nav
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page"),
        name: "PagePermission",
        meta: {
          title: "页面权限",
          roles: ["admin"], // 或者你可以只在子导航设置角色
        },
      },
      {
        path: "directive",
        component: () => import("@/views/permission/directive"),
        name: "DirectivePermission",
        meta: {
          title: "指令权限",
          // 如果不设置角色,意思是:这个页面不需要许可
        },
      },
      {
        path: "role",
        component: () => import("@/views/permission/role"),
        name: "RolePermission",
        meta: {
          title: "角色权限",
          roles: ["admin"],
        },
      },
    ],
  },

  {
    path: "/icon",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/icons/index"),
        name: "Icons",
        meta: { title: "Icons", icon: "icon", noCache: true },
      },
    ],
  },

  // 当你的路由map太长,你可以分割成小模块
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,
  demoRouter,

  {
    path: "/example",
    component: Layout,
    redirect: "/example/list",
    name: "Example",
    meta: {
      title: "案例",
      icon: "el-icon-s-help",
    },
    children: [
      {
        path: "create",
        component: () => import("@/views/example/create"),
        name: "CreateArticle",
        meta: { title: "创建文章", icon: "edit" },
      },
      {
        path: "edit/:id(\\d+)",
        component: () => import("@/views/example/edit"),
        name: "EditArticle",
        meta: { title: "编辑文章", noCache: true, activeMenu: "/example/list" },
        hidden: true,
      },
      {
        path: "list",
        component: () => import("@/views/example/list"),
        name: "ArticleList",
        meta: { title: "文章列表", icon: "list" },
      },
    ],
  },

  {
    path: "/tab",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/tab/index"),
        name: "Tab",
        meta: { title: "Tab", icon: "tab" },
      },
    ],
  },

  {
    path: "/error",
    component: Layout,
    redirect: "noRedirect",
    name: "ErrorPages",
    meta: {
      title: "错误页面",
      icon: "404",
    },
    children: [
      {
        path: "401",
        component: () => import("@/views/error-page/401"),
        name: "Page401",
        meta: { title: "401", noCache: true },
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404"),
        name: "Page404",
        meta: { title: "404", noCache: true },
      },
    ],
  },

  {
    path: "/error-log",
    component: Layout,
    children: [
      {
        path: "log",
        component: () => import("@/views/error-log/index"),
        name: "ErrorLog",
        meta: { title: "错误日志", icon: "bug" },
      },
    ],
  },

  {
    path: "/excel",
    component: Layout,
    redirect: "/excel/export-excel",
    name: "Excel",
    meta: {
      title: "Excel",
      icon: "excel",
    },
    children: [
      {
        path: "export-excel",
        component: () => import("@/views/excel/export-excel"),
        name: "ExportExcel",
        meta: { title: "导出 Excel" },
      },
      {
        path: "export-selected-excel",
        component: () => import("@/views/excel/select-excel"),
        name: "SelectExcel",
        meta: { title: "Export 选项" },
      },
      {
        path: "export-merge-header",
        component: () => import("@/views/excel/merge-header"),
        name: "MergeHeader",
        meta: { title: "合并表头" },
      },
      {
        path: "upload-excel",
        component: () => import("@/views/excel/upload-excel"),
        name: "UploadExcel",
        meta: { title: "上传 Excel" },
      },
    ],
  },

  {
    path: "/zip",
    component: Layout,
    redirect: "/zip/download",
    alwaysShow: true,
    name: "Zip",
    meta: { title: "Zip", icon: "zip" },
    children: [
      {
        path: "download",
        component: () => import("@/views/zip/index"),
        name: "ExportZip",
        meta: { title: "导出 Zip" },
      },
    ],
  },

  {
    path: "/pdf",
    component: Layout,
    redirect: "/pdf/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/pdf/index"),
        name: "PDF",
        meta: { title: "PDF", icon: "pdf" },
      },
    ],
  },
  {
    path: "/pdf/download",
    component: () => import("@/views/pdf/download"),
    hidden: true,
  },

  {
    path: "/theme",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/theme/index"),
        name: "Theme",
        meta: { title: "主题", icon: "theme" },
      },
    ],
  },

  {
    path: "/clipboard",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/clipboard/index"),
        name: "ClipboardDemo",
        meta: { title: "剪贴板", icon: "clipboard" },
      },
    ],
  },

  {
    path: "external-link",
    component: Layout,
    children: [
      {
        path: "https://github.com/PanJiaChen/vue-element-admin",
        meta: { title: "外部链接", icon: "link" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // 需要服务端支持
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
