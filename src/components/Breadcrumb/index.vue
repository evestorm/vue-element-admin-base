<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from "path-to-regexp";

export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route(route) {
      // 如果去重定向页面,不更新面包屑
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    /**
     * @description 获取面包屑
     */
    getBreadcrumb() {
      // 只显示 meta.title 的路由
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      // [{
      // meta: {
      //    icon: "guide"
      //    noCache: true
      //    title: "Guide"
      // }
      // }]
      const first = matched[0];

      // 如果不是，就往后拼接 Home/Guide | Home/Permission/Page Permission
      if (!this.isDashboard(first)) {
        matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
      }

      // 如果存在meta且meta中有title，且meta中的breadcrumb不为false
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
    },
    /**
     * @description 是否为 Dashboard
     */
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === "Home".toLocaleLowerCase();
    },
    /**
     * @description 让面包屑支持:id的方式
     * @issue https://github.com/PanJiaChen/vue-element-admin/issues/561
     */
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      const toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    /**
     * @description 跳转选中面包屑
     */
    handleLink(item) {
      const { redirect, path } = item; // item为当前选中的面包屑route

      // path: "/permission"
      // redirect: "/permission/page"

      // 如果有 redirect ，就重定向到指定页面
      if (redirect) {
        this.$router.push(redirect);
        return;
      }

      // 没有就
      // path: "/home"
      this.$router.push(this.pathCompile(path));
    },
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  margin-left: 8px;
  font-size: 14px;
  line-height: 50px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
