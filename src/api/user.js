import request from "@/utils/request";
import qs from "qs";

// http api
const urlLists = {
  /**
   * ! ---------------------- 用户登录 ----------------------
   */
  login: "/login.do", // 登录
  menu: "/menu.do", // 菜单
  getInfo: `${process.env.VUE_APP_MOCK_PREFIX}/user/info`, // 获取用户信息
  logout: `${process.env.VUE_APP_MOCK_PREFIX}/user/logout`, // 登出
};

const login = params => {
  return request.post(urlLists.login, qs.stringify(params));
};
const menu = params => {
  return request.post(urlLists.menu, params);
};
const getInfo = (params = { token: "" }) => {
  return request.get(urlLists.getInfo, params);
};
const logout = (params = {}) => {
  return request.post(urlLists.logout, params);
};

const pcLogin = (params = { sid: "", userId: "", userName: "" }) => {
  return request.post(urlLists.pcLogin, params);
};

export default {
  login,
  menu,
  getInfo,
  logout,
  pcLogin,
};
