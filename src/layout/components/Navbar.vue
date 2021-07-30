<template>
  <el-row class="navbar" :gutter="0">
    <!-- <el-row :gutter="0"> -->
    <el-col v-show="device !== 'mobile'" class="hidden-lg-and-down">
      <!-- 移动端不显示 -->
      <logo :collapse="false" style="margin-right: auto" />
    </el-col>
    <el-col v-show="device === 'mobile'" class="hidden-lg-and-up">
      <!-- 顶部导航栏的汉堡菜单，用来隐藏和显示侧边栏 -->
      <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    </el-col>
    <el-col class="hidden-lg-and-down">
      <!-- 导航栏 -->
      <menu-view v-show="device !== 'mobile'" />
    </el-col>
    <el-col>
      <!-- 右侧菜单 -->
      <div v-if="needLogin" class="right-menu">
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <!-- 当前登录用户avatar -->
          <div class="avatar-wrapper">
            <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span style="display: block">登出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
    <!-- </el-row> -->
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import MenuView from "@/layout/components/MenuView";
import Logo from "@/layout/components/Sidebar/Logo.vue";
import { needLogin } from "@/settings";

export default {
  components: {
    Hamburger,
    MenuView,
    Logo,
  },
  data() {
    return {
      needLogin,
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.navbar {
  position: relative;
  display: flex;
  height: 50px;
  overflow: hidden;
  background: $navBgColor;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  justify-content: flex-end;

  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 46px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    height: 100%;
    line-height: 50px;
    text-align: right;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        margin-top: 5px;

        .user-avatar {
          width: 40px;
          height: 40px;
          cursor: pointer;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
