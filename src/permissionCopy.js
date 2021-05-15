import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // 进度条指示器
import "nprogress/nprogress.css"; // 进度条指示器css
import { getToken } from "@/utils/auth"; // 从 cookie 获取 token
import getPageTitle from "@/utils/get-page-title"; // 获取当前页面标题

NProgress.configure({ showSpinner: false }); // 进度条指示器配置

const whiteList = ["/login", "/auth-redirect"]; // 白名单

router.beforeEach(async (to, from, next) => {
  // 开始跑进度条
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // 判断用户是否已经登录
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      // 如果已经登录,重定向到主页
      next({ path: "/" });
      NProgress.done(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 判断用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          // 获取用户信息
          // WARNING: 角色必须是一个对象数组。如:['admin'],['developer','editor']
          const { roles } = await store.dispatch("user/getInfo");

          // 生成基于当前角色的访问route地图
          const accessRoutes = await store.dispatch("permission/generateRoutes", roles);

          // 动态添加 route
          router.addRoutes(accessRoutes);

          // hack方式确保addRoutes完成
          // 设置 `replace: true` ,所以导航不会留下历史记录
          next({ ...to, replace: true });
        } catch (error) {
          // 删除token并去登录页面重新登录
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 在登录白名单中，直接跳转
      next();
    } else {
      // 没有权限访问其他页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // 完成进度条
  NProgress.done();
});
