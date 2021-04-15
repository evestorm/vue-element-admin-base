import Vue from "vue";
import store from "@/store";
import { isString, isArray } from "@/utils/validate";
import settings from "@/settings";

// 你可以在 settings.js 中设置
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings;

// 检查是否需要错误日志
function checkNeed() {
  const env = process.env.NODE_ENV;
  if (isString(needErrorLog)) {
    return env === needErrorLog;
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env);
  }
  return false;
}

if (checkNeed()) {
  Vue.config.errorHandler = function (err, vm, info, a) {
    // 不要问我为什么我使用 Vue.nextTick, 它只是一个hack方式
    // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    Vue.nextTick(() => {
      store.dispatch("errorLog/addErrorLog", {
        err,
        vm,
        info,
        url: window.location.href,
      });
      console.error(err, info, a);
    });
  };
}
