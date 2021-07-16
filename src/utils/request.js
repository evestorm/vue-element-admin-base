import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
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
    // 有 token ，则携带令牌
    if (store.getters.token) {
      config.headers.Authorization = store.getters.token;
    }
    return config;
  },
  error => {
    console.log(error);
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
   * 你也可以通过HTTP状态码来判断
   */
  response => {
    // res：后端返回的真正response
    const rootRes = response.data;
    const customCode = Number(rootRes.resCode || rootRes.code);
    const msg = rootRes.msg;

    // 如果自定义 code 不是 10000 ，当错误处理
    if (customCode !== 10000) {
      Message({
        message: msg || "出错了 o(╥﹏╥)o",
        type: "error",
        duration: 5 * 1000,
      });

      // 10007: 非法 token
      if (customCode === 10007) {
        // 重新登录
        MessageBox.confirm("您已登出, 您可以退出此页面, 或者重新登录", "确认登出", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          store.dispatch("user/logout").then(() => {
            location.reload();
          });
        });
      }
      return Promise.resolve([msg, undefined]);
    } else {
      return Promise.resolve([undefined, rootRes]);
    }
  },
  error => {
    // 异常处理
    console.log("err" + error); // for debug
    let msg = "";
    const { code, message } = error;
    if (code === "ECONNABORTED" || message === "Network Error") {
      msg = "出错了 o(╥﹏╥)o，请稍后重试";
    } else {
      msg = error.message;
    }

    Message({
      message: msg,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.resolve([error, undefined]);
  },
);

// 包装请求
let request = {};
const base = process.env === "production" ? appConfig.baseURL : "./tms-facdel/"; // url = base url + request url
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
