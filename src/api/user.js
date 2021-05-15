import request from "@/utils/request";

// http api
const urlLists = {
  /**
   * ! ---------------------- 用户登录 ----------------------
   */
  login: `${process.env.VUE_APP_MOCK_PREFIX}/user/login`, // 登录
  getInfo: `${process.env.VUE_APP_MOCK_PREFIX}/user/info`, // 获取用户信息
  logout: `${process.env.VUE_APP_MOCK_PREFIX}/user/logout`, // 登出

  pcLogin: "https://hxwlappd.huaxincem.com/driverHome/pcLogin", // PC用户登录并获取菜单
};

const login = params => {
  return request.post(urlLists.login, params);
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
  getInfo,
  logout,
  pcLogin,
};
