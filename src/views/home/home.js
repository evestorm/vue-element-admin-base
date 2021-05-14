// 引入 vuex
import { mapGetters, mapActions, mapMutations } from "vuex";
// api 网络请求
import article from "@/api/article";
// 组件
import SubComp from "@/views/home/components/sub-comp/sub-comp.vue";

export default {
  name: "Home",
  data() {
    return {
      title: "标题",
    };
  },
  // 组件
  components: {
    SubComp,
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    console.log("create");
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  async mounted() {
    this.SET_NAME("lance");
    console.log(this.getName);
    this.getNewsInfo({ pageIndex: 1, pageSize: 10, siteArticleType: "10" });
    const result = await article.fetchList();
    console.log(result);
  },
  // 计算属性
  computed: {
    ...mapGetters("demo", ["getName"]), // 「store/modules/demo 中的 getter」
    ...mapGetters(["token"]), // 「store/getters.js 中的getter」
  },
  // 过滤
  filters: {
    parseScene: function (value) {
      return value + "123";
    },
  },
  // 方法
  methods: {
    ...mapMutations("demo", ["SET_NAME"]),
    ...mapActions("demo", ["getNewsInfo"]),
  },
  // 监听
  watch: {
    name: {
      immediate: true, // 立即执行
      deep: true, // 深度监听
      handler(newValue, oldValue) {
        // TODO
        console.log({
          newValue,
          oldValue,
        });
      },
    },
  },
};
