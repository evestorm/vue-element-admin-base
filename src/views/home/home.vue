<!-- home -->
<template>
  <div class="app-container">
    <h1>{{ title }}</h1>
    <!-- vuex->demo下的getters -->
    <div>{{ getName }}</div>
    <!-- 全局 getters 中的 token -->
    <div>{{ token }}</div>
    <!-- 组件 -->
    <sub-comp></sub-comp>
  </div>
</template>

<script src="./home.js"></script>
<style lang="scss" scoped>
@import "./home.scss"; // 引入scss类
</style>
