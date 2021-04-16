import request from "@/utils/request";

// http api
const urlLists = {
  /**
   * ! ---------------------- 用户登录 ----------------------
   */
  getToken: "/qiniu/upload/token", // 获取token
};

const getToken = params => {
  return request.get(urlLists.getToken, params);
};

export default {
  getToken,
};
