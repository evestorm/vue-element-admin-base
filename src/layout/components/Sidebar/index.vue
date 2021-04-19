<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper" :style="{ paddingTop: isCollapse ? '0' : '40px' }">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["permission_routes", "sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

::v-deep {
  .el-scrollbar {
    padding-top: 40px;
    transition: all 0.5s ease-in-out;

    .scrollbar-wrapper {
      .el-scrollbar__view {
        position: relative;
        // padding-bottom: 200px !important;
        // background-color: $menuBg;

        & > * {
          z-index: 0;
        }

        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 120px;
          background-image: url("~@/assets/sidebar/sidebar-bg.png");
          background-position: center bottom;
          background-repeat: no-repeat;
          background-size: contain;
          // content: "";
        }
      }
    }
  }
}
</style>
