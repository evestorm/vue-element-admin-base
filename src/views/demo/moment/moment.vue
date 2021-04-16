<template>
  <div>
    <h1 class="text-primary" @click="init">moment用法</h1>
    <h2>moment文档（中文）</h2>
    <a target="_blank" :href="link">{{ link }}</a>
    <h2>使用示例</h2>
    <div>
      格式化当前时间：
      <pre>this.$moment().format('YYYY-MM-DD HH:mm:ss')</pre>
    </div>
    <div>
      比较两个时间的大小：
      <pre>this.$moment('2010-10-31').isBefore('2010-12-31', 'day');</pre>
      <pre>this.$moment('2010-10-20').isBefore('2010-12-31', 'year');</pre>
      <pre>this.$moment('2010-10-20').isAfter('2009-12-31', 'year');</pre>
      <pre>this.$moment('2010-10-20').isSame('2009-12-31', 'year');</pre>
      <p>需要注意的是， isBefore与isAfter 都是开区间，如果想使用闭区间，应使用</p>
      <p>isSameOrBefore isSameOrAfter</p>
    </div>
    <div>
      两个时间的相差几天
      <pre>this.$moment([2008, 2, 27]).diff([2007, 0, 28], 'day');</pre>
    </div>
  </div>
</template>

<script src="./moment.js"></script>

<style lang="scss" scoped>
@import "./moment";
</style>
