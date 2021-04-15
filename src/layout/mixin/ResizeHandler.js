import store from "@/store";

const { body } = document;
const WIDTH = 992; // 参考自 Bootstrap 的响应式设计

// 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。
// 一个混入对象可以包含任意组件选项。当组件使用混入对象时，
// 所有混入对象的选项将被“混合”进入该组件本身的选项。
// https://cn.vuejs.org/v2/guide/mixins.html

export default {
  watch: {
    $route(route) {
      // 路由变化时，如果设备为移动端且侧边栏为打开状态，此时关闭侧边栏（带动画）
      if (this.device === "mobile" && this.sidebar.opened) {
        store.dispatch("app/closeSideBar", { withoutAnimation: false });
      }
    },
  },
  beforeMount() {
    // 组件装载前监听窗口 resize
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeDestroy() {
    // 组件销毁前移除窗口监听
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  mounted() {
    // 检测当前是否为<992的移动设备
    const isMobile = this.$_isMobile();
    if (isMobile) {
      // 设置当前设备为mobile
      store.dispatch("app/toggleDevice", "mobile");
      // 关闭侧边栏
      store.dispatch("app/closeSideBar", { withoutAnimation: true });
    }
  },
  methods: {
    // 使用 $_ 作为 mixins 属性
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    // 检测当前设备是否为移动设备
    $_isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    // 处理 resize 方法
    $_resizeHandler() {
      if (!document.hidden) {
        // 检测是否为移动端，是则设置 device 状态为 mobile ，否为桌面端
        const isMobile = this.$_isMobile();
        store.dispatch("app/toggleDevice", isMobile ? "mobile" : "desktop");

        // 是移动端关闭侧边栏
        if (isMobile) {
          store.dispatch("app/closeSideBar", { withoutAnimation: true });
        }
      }
    },
  },
};
