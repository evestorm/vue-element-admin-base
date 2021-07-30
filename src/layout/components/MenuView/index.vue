<template>
  <div class="menu-view">
    <el-scrollbar class="scrollbar">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="horizontal"
      >
        <sub-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SubItem from "@/layout/components/MenuView/SubItem.vue";
import variables from "@/styles/variables.scss";

export default {
  components: { SubItem },
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
@import "~@/styles/variables.scss";
@import "~@/styles/sidebar.scss";

// @mixin resethorizontal {
//   float: left !important;
//   height: 50px !important;
//   margin: 0 !important;
//   line-height: 50px !important;

//   svg {
//     margin-right: 10px;
//   }

//   svg + span {
//     margin-right: 20px;
//   }
// }

.menu-view {
  max-width: 1200px;

  .scrollbar {
    height: 100%;
  }

  ::v-deep {
    @include generateMenu(true);

    .el-menu {
      justify-content: center;
    }
  }
}
</style>
