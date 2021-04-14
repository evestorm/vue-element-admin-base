/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const componentsRouter = {
  path: "/components",
  component: Layout,
  redirect: "noRedirect",
  name: "ComponentDemo",
  meta: {
    title: "组件",
    icon: "component",
  },
  children: [
    {
      path: "tinymce",
      component: () => import("@/views/components-demo/tinymce"),
      name: "TinymceDemo",
      meta: { title: "Tinymce" },
    },
    {
      path: "markdown",
      component: () => import("@/views/components-demo/markdown"),
      name: "MarkdownDemo",
      meta: { title: "Markdown" },
    },
    {
      path: "json-editor",
      component: () => import("@/views/components-demo/json-editor"),
      name: "JsonEditorDemo",
      meta: { title: "JSON 编辑器" },
    },
    {
      path: "split-pane",
      component: () => import("@/views/components-demo/split-pane"),
      name: "SplitpaneDemo",
      meta: { title: "分割面板" },
    },
    {
      path: "avatar-upload",
      component: () => import("@/views/components-demo/avatar-upload"),
      name: "AvatarUploadDemo",
      meta: { title: "上传" },
    },
    {
      path: "dropzone",
      component: () => import("@/views/components-demo/dropzone"),
      name: "DropzoneDemo",
      meta: { title: "Dropzone上传" },
    },
    {
      path: "sticky",
      component: () => import("@/views/components-demo/sticky"),
      name: "StickyDemo",
      meta: { title: "Sticky吸顶" },
    },
    {
      path: "count-to",
      component: () => import("@/views/components-demo/count-to"),
      name: "CountToDemo",
      meta: { title: "计数 Count To" },
    },
    {
      path: "mixin",
      component: () => import("@/views/components-demo/mixin"),
      name: "ComponentMixinDemo",
      meta: { title: "组件混合" },
    },
    {
      path: "back-to-top",
      component: () => import("@/views/components-demo/back-to-top"),
      name: "BackToTopDemo",
      meta: { title: "回到顶部" },
    },
    {
      path: "drag-dialog",
      component: () => import("@/views/components-demo/drag-dialog"),
      name: "DragDialogDemo",
      meta: { title: "拖拽窗口" },
    },
    {
      path: "drag-select",
      component: () => import("@/views/components-demo/drag-select"),
      name: "DragSelectDemo",
      meta: { title: "拖拽选择" },
    },
    {
      path: "dnd-list",
      component: () => import("@/views/components-demo/dnd-list"),
      name: "DndListDemo",
      meta: { title: "拖动列表" },
    },
    {
      path: "drag-kanban",
      component: () => import("@/views/components-demo/drag-kanban"),
      name: "DragKanbanDemo",
      meta: { title: "拖动看板" },
    },
  ],
};

export default componentsRouter;
