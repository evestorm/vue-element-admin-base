<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from "@/utils/scroll-to";

export default {
  name: "Pagination",
  props: {
    total: {
      // 总数
      required: true,
      type: Number,
    },
    page: {
      // 总页数
      type: Number,
      default: 1,
    },
    limit: {
      // 每页限制多少条
      type: Number,
      default: 20,
    },
    pageSizes: {
      // 快捷选择跳到第多少页
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
    layout: {
      // 分页布局
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    background: {
      // 页数按钮要不要背景色
      type: Boolean,
      default: true,
    },
    autoScroll: {
      // 选择页码后自动滚动到顶部
      type: Boolean,
      default: true,
    },
    hidden: {
      // 是否隐藏分页组件
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
  },
};
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
