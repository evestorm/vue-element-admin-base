import $user from "@/api/user";
import { setToken } from "@/utils/auth";
import storage from "@/utils/storage/index";
import router, { resetRouter } from "@/router";
import { treeForeach } from "@/utils/index";

const state = {
  loginParams: {
    sid: "",
    userId: "",
    userName: "",
  }, // 登录需要的参数
  token: storage.getToken(), // token
  userInfo: {}, // 用户信息
  menu: [], // 树结构菜单
  flatMenu: [], // 拍平后的菜单
  roles: [], // mock数据可以在 `mock/role/index.js` 中查看
};

const mutations = {
  // 设置登录所需参数
  SET_LOGIN_PARAMS: (state, loginParams) => {
    state.loginParams = loginParams;
  },
  // 设置token
  SET_TOKEN: (state, token) => {
    state.token = token;
    storage.setToken(token);
  },
  // 设置用户信息
  SET_USER_INFO: (state, userInfo) => {
    if (userInfo) {
      userInfo.avatar = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";
    }
    state.userInfo = userInfo;
    storage.setUserInfo(userInfo);
  },
  // 设置侧边栏菜单
  SET_MENU: (state, menu) => {
    state.menu = menu;
    storage.setMenu(menu);
  },
  // 设置扁平化后的菜单
  SET_FLAT_MENU: (state, menus) => {
    let flatMenu = [];
    //  拍平菜单
    treeForeach(menus, menu => {
      flatMenu.push(menu);
    });
    state.flatMenu = flatMenu;
    storage.setFlatMenu(flatMenu);
  },
  // 设置用户权限
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  // 用户登录
  async login({ commit, state }) {
    const { sid, userId, userName } = state.loginParams;
    try {
      const userData = await $user.pcLogin({ sid, userId, userName });
      const { data } = userData;

      // 保存 token
      // 保存用户信息
      // 保存 menu
      commit("SET_TOKEN", data.token);
      commit("SET_USER_INFO", data);
      commit("SET_MENU", data.menu);
      commit("SET_FLAT_MENU", data.menu);
      return true;
    } catch (e) {
      return e;
    }
  },

  // 用户登出
  async logout({ commit, dispatch }) {
    try {
      commit("SET_TOKEN", "");
      commit("SET_USER_INFO", {});
      commit("SET_MENU", []);
      commit("SET_FLAT_MENU", []);

      await dispatch("tagsView/delAllViews", null, { root: true });
    } catch (e) {
      return e;
    }
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      resolve();
    });
  },

  // FIXME: 暂时没用到 - 动态修改权限
  async changeRoles({ commit, dispatch }, role) {
    const token = role + "-token";

    commit("SET_TOKEN", token);
    setToken(token);

    const { roles } = await dispatch("getInfo");

    resetRouter();

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch("permission/generateRoutes", roles, { root: true });
    // dynamically add accessible routes
    router.addRoutes(accessRoutes);

    // reset visited views and cached views
    dispatch("tagsView/delAllViews", null, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
