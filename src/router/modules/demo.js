/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const demoRouter = {
  path: "/demo",
  component: Layout,
  redirect: "noRedirect",
  name: "示例", // 组件.vue 文件的首字母大写，驼峰命名
  meta: {
    title: "Demo",
    icon: "component",
  },
  children: [
    {
      path: "moment",
      component: () => import("@/views/demo/moment/moment.vue"),
      name: "Demo",
      meta: { title: "Demo" },
    },
    // {
    //   path: "markdown",
    //   component: () => import("@/views/components-demo/markdown"),
    //   name: "MarkdownDemo",
    //   meta: { title: "Markdown" },
    // }
  ],
};

export default demoRouter;
