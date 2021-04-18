<!-- home -->
<template>
  <div>{{ title }}</div>
</template>

<script src="./home.js">
export default {
  name: 'Home',
  data() {
    return {
      title: '标题',
    };
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
@import "./home.scss"; // 引入scss类
</style>
