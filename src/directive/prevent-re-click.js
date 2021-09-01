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
