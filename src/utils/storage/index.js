import Storage from "./Storage.js";

const prefix = "HX.";

const storage = {
  // 设置token缓存
  setToken(token, timeout) {
    Storage.set(prefix + "Token", token, timeout);
  },
  // 获取token
  getToken() {
    return Storage.get(prefix + "Token");
  },
  // 移除token
  removeToken() {
    Storage.remove(prefix + "Token");
  },

  // 设置用户信息
  setUserInfo(userInfo) {
    // 设置全局用户信息
    // getApp().globalData.userInfo = userInfo;
    // getApp().globalData.LoginUserId = userInfo.id;
    return Storage.set(prefix + "UserInfo", userInfo);
  },
  // 获取用户信息
  getUserInfo() {
    return Storage.get(prefix + "UserInfo");
  },
  // 移除用户信息
  removeUserInfo() {
    Storage.remove(prefix + "UserInfo");
  },
};

export default storage;
