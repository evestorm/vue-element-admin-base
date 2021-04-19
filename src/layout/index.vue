<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 当device为移动端且侧边栏开启时，显示 drawer-bg 遮罩，点击遮罩，关闭侧边栏 -->
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" />
    <!-- 如果展示标签，就加上标签的34px /* 84 = navbar + tags-view = 50 + 34 */ -->
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <!-- 是否固定header -->
      <div :class="{ 'fixed-header': fixedHeader }">
        <!-- 顶部导航栏 -->
        <navbar />
        <!-- 标签栏 -->
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <!-- 右侧容器 -->
      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
    </div>
  </div>
</template>

<script>
// 右边设置的侧边栏
import RightPanel from "@/components/RightPanel";
import { AppMain, Navbar, Settings, Sidebar, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState } from "vuex";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
  },
  mixins: [ResizeMixin], // 用来切换当前设备状态（移动端or桌面端）移动端则关闭侧边栏
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
  methods: {
    // 关闭侧边栏
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;

  position: relative;
  width: 100%;
  height: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
