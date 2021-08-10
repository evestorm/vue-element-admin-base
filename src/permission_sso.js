import router from "./router";
import { asyncRoutes } from "@/router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // 进度条指示器
import "nprogress/nprogress.css"; // 进度条指示器css
import getPageTitle from "@/utils/get-page-title"; // 获取当前页面标题
import * as utils from "@/utils/index";
import storage from "@/utils/storage/index";
import appConfig from "@/config/index";
import { needLogin } from "./settings";

let isFirst = true; // 是否第一次登陆

NProgress.configure({ showSpinner: false }); // 进度条指示器配置

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

  // 获取url参数
  // const url = window.location.href.split("#")[0];
  const url = window.location.href;
  const loginParams = utils.getQueryObject(url);
  const { hafSID: sid, userId, username: userName } = loginParams;
  console.log({
    to,
    from,
    loginParams,
  });

  if (sid && userId && userName && isFirst === true) {
    // debugger;
    isFirst = false;

    const [err, isLogin] = await store.dispatch("user/loginSSO", {
      sid,
      userId,
      userName,
    });
    // debugger;
    // 登录成功
    if (!err && isLogin) {
      // debugger;
      // 获取当前用户菜单

      // FIXME: 目前没有角色 - 默认传admin
      const accessRoutes = await store.dispatch("permission/generateRoutes", ["admin"]);
      // 动态添加 route
      router.addRoutes(accessRoutes);

      // hack方式确保addRoutes完成
      // 设置 `replace: true` ,所以导航不会留下历史记录
      next({ ...{ ...to, query: {} }, replace: true });
    } else {
      // debugger;
      // 登录失败
      // 删除token并去登录页面重新登录
      await store.dispatch("user/resetToken");
      Message.error("登录失败，即将跳转到登录授权页...");
      NProgress.done();
      setTimeout(() => {
        window.location.href = appConfig.redirectURL;
      }, 3000);
    }
  } else {
    console.log(storage.getToken());
    // 没有 sid && userId && username ，检查本地是否有token
    if (storage.getToken()) {
      if (isFirst === true) {
        isFirst = false;
        // 重新赋值:
        // 保存 token
        // 保存用户信息
        // 保存 menu
        store.commit("user/SET_TOKEN", storage.getToken());
        store.commit("user/SET_USER_INFO", storage.getUserInfo());
        store.commit("user/SET_MENU", storage.getMenu());
        store.commit("user/SET_FLAT_MENU", storage.getFlatMenu());

        // 放行
        // 生成基于当前角色的访问route地图
        const accessRoutes = await store.dispatch("permission/generateRoutes", ["admin"]);

        // 动态添加 route
        router.addRoutes(accessRoutes);

        // hack方式确保addRoutes完成
        // 设置 `replace: true` ,所以导航不会留下历史记录
        next({ ...to, replace: true });
      } else {
        // debugger;
        next();
      }
    } else {
      // debugger;
      // 登录失败
      // 删除token并去登录页面重新登录
      await store.dispatch("user/resetToken");
      Message.error("登录失败，即将跳转到登录授权页...");
      NProgress.done();
      setTimeout(() => {
        window.location.href = appConfig.redirectURL;
      }, 3000);
    }
  }

  // if (sid && userId && userName) {
  //   // 1. 有 sid && userId && username (强制重新登录)
  //   const [err, isLogin] = await store.dispatch("user/loginSSO", {
  //     sid,
  //     userId,
  //     userName,
  //   });

  //   // 登录成功
  //   if (!err && isLogin) {
  //     // 1.1 登录成功，获取 token ，userInfo，menu，生成路由

  //     // 生成基于当前角色的访问route地图
  //     const accessRoutes = await store.dispatch("permission/generateRoutes", ["admin"]);
  //     console.log({ accessRoutes当前路由: accessRoutes });
  //     // 动态添加 route
  //     router.addRoutes(accessRoutes);

  //     // hack方式确保addRoutes完成
  //     // 设置 `replace: true` ,所以导航不会留下历史记录
  //     next({ ...to, replace: true });
  //   } else {
  //     // 1.2 登录失败，跳转登录授权页
  //     // 删除token并去登录页面重新登录
  //     await store.dispatch("user/logout");
  //     Message.error("登录失败，即将跳转到登录授权页...");
  //     NProgress.done();
  //     setTimeout(() => {
  //       window.location.href = appConfig.redirectURL;
  //     }, 3000);
  //   }
  // } else {
  //   // 2. 没有 sid && userId && username
  //   const hasToken = storage.getToken();
  //   if (hasToken) {
  //     // 2.1 storage有token
  //     if (store.state.user.flatMenu.length > 0) {
  //       // 2.1.1 store有菜单
  //       next();
  //     } else {
  //       // 2.1.2 store无菜单

  //       // 生成基于当前角色的访问route地图
  //       const accessRoutes = await store.dispatch("permission/generateRoutes", ["admin"]);
  //       console.log({ accessRoutes当前路由: accessRoutes });
  //       // 动态添加 route
  //       router.addRoutes(accessRoutes);

  //       // hack方式确保addRoutes完成
  //       // 设置 `replace: true` ,所以导航不会留下历史记录
  //       next({ ...to, replace: true });
  //     }
  //   } else {
  //     // 2.2 无token
  //     // 删除token并去登录页面重新登录
  //     await store.dispatch("user/logout");
  //     Message.error("登录失败，即将跳转到登录授权页...");
  //     NProgress.done();
  //     setTimeout(() => {
  //       window.location.href = appConfig.redirectURL;
  //     }, 3000);
  //   }
  // }
});

router.afterEach(() => {
  // 完成进度条
  NProgress.done();
});
