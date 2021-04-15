import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
// 可以利用 require.context 来遍历目录下的文件名，再用文件名来加载文件中的模块，从而简化频繁 import 多个文件的操作
const modulesFiles = require.context("./modules", true, /\.js$/);

// 你不需要通过 `import app from './modules/app'` 来导入文件
// 下面代码会自动从 modules 文件夹中导入所有vuex模块
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 把 './app.js' 转为 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = new Vuex.Store({
  modules,
  getters,
});

export default store;
