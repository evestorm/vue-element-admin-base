import router from "./router";
import { asyncRoutes } from "@/router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // 进度条指示器
import "nprogress/nprogress.css"; // 进度条指示器css
import getPageTitle from "@/utils/get-page-title"; // 获取当前页面标题
// import * as utils from "@/utils/index";
import storage from "@/utils/storage/index";
// import appConfig from "@/config/index";
import { needLogin } from "./settings";

NProgress.configure({ showSpinner: false }); // 进度条指示器配置

const whiteList = ["/login"]; // 白名单

if (!needLogin) {
  store.commit("permission/SET_ROUTES", asyncRoutes);
  // 动态添加 route
  router.addRoutes(asyncRoutes);
}

router.beforeEach(async (to, from, next) => {
  // 开始跑进度条
  NProgress.start();

  // 设置页面标题
  document.title = getPageTitle(to.meta.title);

  // 如果不需要登录
  if (!needLogin) {
    if (to.path === "/login") {
      next({ path: "/home" });
      NProgress.done();
    } else {
      next();
      NProgress.done();
    }
    return;
  }

  // 判断用户是否已经登录
  const hasToken = storage.getToken();
  if (hasToken) {
    // 有 token
    if (to.path === "/login") {
      // 如果已经登录,重定向到主页
      next({ path: "/home" });
      NProgress.done(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 看 store 有没有侧边栏数据
      if (store.state.user.flatMenu.length > 0) {
        // 有数据
        next();
      } else {
        // 没数据
        await store.dispatch("user/getMenu");
        // 生成基于当前角色的访问route地图
        const accessRoutes = await store.dispatch("permission/generateRoutes", ["admin"]);
        console.log({ accessRoutes当前路由: accessRoutes });
        // 动态添加 route
        router.addRoutes(accessRoutes);

        // hack方式确保addRoutes完成
        // 设置 `replace: true` ,所以导航不会留下历史记录
        next({ ...to, replace: true });
      }
    }
  } else {
    // 没有 token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在登录白名单中，直接跳转
      next();
    } else {
      // 删除token并去登录页面重新登录
      await store.dispatch("user/logout");
      Message.error("出错了 o(╥﹏╥)o");
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // 完成进度条
  NProgress.done();
});
