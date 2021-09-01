export default {
  install(Vue) {
    // 防重复点击(指令实现)
    Vue.directive("preventReClick", {
      inserted(el, binding) {
        el.addEventListener("click", () => {
          if (!el.disabled) {
            el.disabled = true;
            setTimeout(() => {
              el.disabled = false;
            }, binding.value || 3000);
          }
        });
      },
    });
  },
};

// README: 用法

{
  /* <el-button v-preventReClick type="primary" @click="handleClick">点我</el-button> */
  /* <el-button v-preventReClick="1000" type="primary" @click="handleClick">点我</el-button> */
}
