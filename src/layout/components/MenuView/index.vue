<template>
  <div class="menu-view">
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

@mixin resethorizontal {
  float: left !important;
  height: 50px !important;
  margin: 0 !important;
  line-height: 50px !important;

  svg {
    margin-right: 10px;
  }

  svg + span {
    margin-right: 20px;
  }
}

.menu-view {
  width: 500px;
  height: 50px;
  margin-left: 100px;

  ::v-deep {
    .el-menu {
      width: 100% !important;
      height: 100%;
      background-color: $menuBg;
      border: none;

      // 无子菜单
      .el-menu-item.submenu-title-noDropdown {
        @include resethorizontal;

        font-family: Microsoft YaHei;
        font-size: 16px !important;
        font-weight: 400;
        color: $menuText;

        // active
        &.is-active {
          color: $menuActiveText !important;
          background: $menuActiveBg !important;
          border-right: 4px solid $menuBorderBg;
          // color: red !important;
          // background: yellow !important;
          // border-right: 4px solid green;
        }

        // hover
        &:hover {
          color: $subMenuHoverText !important;
          background-color: $subMenuHoverBg !important;
          border-right: 4px solid $menuBorderBg;
          // color: white !important;
          // background-color: black !important;
          // border-right: 4px solid pink;
        }
      }

      // 有子菜单
      .el-submenu {
        @include resethorizontal;
        // 顶级菜单标题
        .el-submenu__title {
          float: left !important;
          height: 50px !important;
          margin: 0 !important;
          font-size: 16px;
          line-height: 50px !important;
          // 未展开，子菜单未选中的状态
          color: $subMenuText !important;
          background-color: $menuBg !important;

          // 二级菜单的下拉三角箭头
          i {
            color: $subMenuText;
          }

          // color: red !important;
          // background-color: lightpink !important;
        }

        // 展开后的容器背景色
        .el-menu {
          @include resethorizontal;

          background-color: $subMenuBg !important;
          // background-color: orange !important;
        }
        // active某个子菜单，其父菜单样式
        &.is-active .el-submenu__title {
          @include resethorizontal;

          color: $subMenuParentActiveText !important;
          background-color: $subMenuParentActiveBg !important;

          i {
            color: $subMenuParentActiveText;
          }
        }
      }

      // 嵌套菜单
      .nest-menu {
        @include resethorizontal;
        // 如果嵌套菜单下还有嵌套菜单，则所有子菜单默认背景黑色
        .el-submenu {
          float: left !important;
          height: 50px !important;
          margin: 0 !important;
          line-height: 50px !important;

          & > .el-submenu__title {
            @include resethorizontal;

            color: $subMenuText !important;
            background-color: $subMenuBg !important;

            i {
              color: $subMenuText;
            }
          }

          // 选中嵌套菜单，上层菜单高亮
          &.is-active {
            & > .el-submenu__title {
              @include resethorizontal;

              color: $subMenuText !important;
              background-color: $subMenuParentActiveBg !important;

              i {
                color: $subMenuText;
              }
            }
          }
        }

        .el-menu-item {
          @include resethorizontal;

          font-size: 16px !important;
          color: $menuText !important;
          background: $subMenuBg !important;
          // color: black !important;
          // background: white !important;
          // active
          &.is-active {
            color: $menuActiveText !important;
            background: $menuActiveBg !important;
            border-right: 4px solid $menuBorderBg;
            // color: red !important;
            // background: yellow !important;
            // border-right: 4px solid green;
          }

          // hover
          &:hover {
            color: $subMenuHoverText !important;
            background-color: $subMenuHoverBg !important;
            // color: pink !important;
            // background-color: lemonchiffon !important;
          }
        }
      }
    }
  }
}
</style>
