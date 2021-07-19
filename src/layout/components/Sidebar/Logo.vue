<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <!-- 折叠侧边栏后只显示logo -->
        <img :src="logoImg" class="logo-img" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img :src="logoImg" class="logo-img" />
        <img :src="logoTitle" class="logo-title" />
      </router-link>
    </transition>
  </div>
</template>

<script>
import logoImg from "@/assets/logo/logo-img.png";
import logoTitle from "@/assets/logo/logo-title.png";
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: "Vue Element Admin",
      logoImg,
      logoTitle,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  overflow: hidden;
  line-height: 50px;
  text-align: center;
  // background-color: $logoBg;
  background: $logoBg, $noise;

  & .sidebar-logo-link {
    display: flex !important;
    width: 100%;
    height: 50px;
    justify-content: center !important;
    align-items: center !important;

    & .logo-img {
      width: 30px;
      height: 32px;
    }

    & .logo-title {
      width: 118px;
      height: 28px;
      margin-left: 10px;
    }

    & .sidebar-logo {
      width: 100%;
      height: 45px;
      padding: 10px 10px 0 10px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      font-size: 14px;
      font-weight: 600;
      line-height: 50px;
      color: #fff;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0;
    }
  }
}
</style>
