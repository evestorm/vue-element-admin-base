import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // 进度条指示器
import "nprogress/nprogress.css"; // 进度条指示器css
// import { getToken } from "@/utils/auth"; // 从 cookie 获取 token
import getPageTitle from "@/utils/get-page-title"; // 获取当前页面标题
import * as utils from "@/utils/index";
import storage from "@/utils/storage/index";
import appConfig from "@/config/index";

// http://localhost:8080/#/?userId=P00025015&username=%E7%8E%8B%E4%BC%9F&hafSID=583d510187874cfdba2511ba41c2f49a

let isFirst = true; // 是否第一次登陆

NProgress.configure({ showSpinner: false }); // 进度条指示器配置

router.beforeEach(async (to, from, next) => {
  // 开始跑进度条
  NProgress.start();

  // 设置页面标题
  document.title = getPageTitle(to.meta.title);

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
  // 只要有上面三个值，就重新登录一次
  if (sid && userId && userName && isFirst === true) {
    // debugger;
    isFirst = false;
    // 赋值 loginParams
    store.commit("user/SET_LOGIN_PARAMS", {
      sid,
      userId,
      userName,
    });
    const isLogin = await store.dispatch("user/login");
    // debugger;
    // 登录成功
    if (isLogin) {
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
      // debugger;
      if (isFirst === true) {
        // debugger;
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
});

router.afterEach(() => {
  // 完成进度条
  NProgress.done();
});
