export default {
  name: "DemoComp",
  // 过滤
  filters: {
    parseScene: function (value) {
      return value + "123";
    },
  },
  props: {
    // 列表
    list: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data() {
    return {
      title: "示例组件",
    };
  },
  // 计算属性
  computed: {
    getTitle() {
      return this.title + "...";
    },
  },
  // 监听
  watch: {
    name: {
      immediate: true, // 立即执行
      deep: true, // 深度监听
      handler(newValue, oldValue) {
        // TODO
      },
    },
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  // 方法
  methods: {},
};
