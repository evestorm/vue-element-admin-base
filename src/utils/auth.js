import Cookies from "js-cookie";

// TODO: token key 设置
const TokenKey = "Admin-Token";

/**
 * @description 获取token
 */
export function getToken() {
  return Cookies.get(TokenKey);
}

/**
 * 设置token
 * @param {string} token token
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

/**
 * @description 移除token
 */
export function removeToken() {
  return Cookies.remove(TokenKey);
}
