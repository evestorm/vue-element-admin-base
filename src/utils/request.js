import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
// import qs from "qs";
import appConfig from "@/config/index";

// 创建 axios 实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 当跨域请求发送cookie
  timeout: 5000, // request timeout
  validateStatus(status) {
    switch (status) {
      case 400:
        Message.error("请求出错");
        break;
      case 401:
        Message.warning({
          message: "授权失败，请重新登录",
        });
        // store.commit('LOGIN_OUT');
        // setTimeout(() => {
        //     window.location.reload();
        // }, 1000);
        return;
      case 403:
        Message.warning({
          message: "拒绝访问",
        });
        break;
      case 404:
        Message.warning({
          message: "请求错误,未找到该资源",
        });
        break;
      case 500:
        Message.warning({
          message: "服务端错误",
        });
        break;
      default:
        break;
    }
    return status >= 200 && status < 300;
  },
});

// post请求头
// service.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;";

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做的事情
    // 如果 Vuex 中有token

    if (store.getters.token) {
      // 让当前请求携带token令牌
      // ['X-Token'] 是一个自定义 headers key
      // 根据实际情况修改此key
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  error => {
    // 请求出错后做的事情
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  /**
   * 如果你想获得http的 headers 或 status 等信息
   * 需要 return  response => response
   */

  /**
   * 根据后端自定义code来判断响应状态
   * 下面只是个例子
   * 你也可以通过HTTP状态码来判断
   */
  response => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    // 如果自定义code不是20000,当错误处理。
    if (res.code !== 20000) {
      Message({
        message: res.message || "出错了",
        type: "error",
        duration: 5 * 1000,
      });

      // 50008: 非法 token; 50012: 其他客户登录; 50014: 令牌过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        MessageBox.confirm("你已登出, 你可以退出此页面, 或者重新登录", "确认登出", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "出错"));
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

// 包装请求
let request = {};
const base = appConfig.baseURL; // url = base url + request url
request.get = (url, params, baseURL = base) => {
  return service.get(url, { params, baseURL });
};
request.post = (url, params, baseURL = base) => {
  // service.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded;";
  return service.post(
    url,
    // mock环境下，直接传data: params 的形式
    // https://github.com/PanJiaChen/vue-element-admin/issues/1478#issuecomment-450476984
    // qs.stringify(params) 配合上边注释的 ["Content-Type"] = "application/x-www-form-urlencoded;"; 使用
    // 如果不设置 application/x-www-form-urlencoded; 则都用 params ，不用qs转
    process.env.VUE_APP_FLAG === "mock" ? params : params,
    { baseURL },
  );
};
request.put = (url, params, baseURL = base) => {
  return service.put(url, params, { baseURL });
};
// axios delete 没有 params 参数，传参要么直接放url后面，要么通过 config 的 data 传入
request.delete = (url, params, baseURL = base) => {
  return service.delete(url, {
    baseURL,
    data: params,
  });
};

export default request;
