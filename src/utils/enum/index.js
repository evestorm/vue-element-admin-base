import { Enum } from "./Enum";

/**
 * 全局公共枚举类
 */
export default {
  // 公共列表页页面类型
  commonListEnum: new Enum()
    .add("customerOrder", "客户订单", "1")
    .add("banquetOrder", "宴会订单", "2")
    .add("individualOrders", "散客订单", "3")
    .add("accommodationOrder", "住宿订单", "4")
    .add("transformOrder", "转化订单", "5")
    .add("activeTransformation", "全部转化", "6") // 从主动转化改为全部转化
    .add("recommendedTransformation", "推荐转化", "7")
    .add("customerPool", "客户池", "8")
    .add("customerTracking", "客户跟踪", "9"),
  // // 结果枚举
  // ResultEnum: new Enum().add('SUCCESS', '操作成功', 200).add('ERROR', '操作失败', 400).add('PARAM_ERROR', '参数错误', 405).add(
  // 		'SERVER_ERROR', '服务器异常', 500)
  // 	.add('NO_PERMISSION', '没有权限', 501)
  // mapEnum: new Enum()
  //   // typeShow: 是否展示在编辑页的选择添加类型上
  //   // show: 是否展示在库区图中
  //   .add("input", "进料口", 2, { show: true, typeShow: true, fill: "rgba(16, 247, 191, 0.25)", activeFill: "rgba(163, 247, 191, 1)" })
  //   .add("output", "出料口", 3, { show: true, typeShow: true, fill: "rgba(255, 245, 145, 0.25)", activeFill: "rgba(255, 245, 145, 1)" })
  //   .add("area", "物料", 1, { show: true, typeShow: true, fill: "rgba(15, 255, 255, 0.25)", activeFill: "rgba(15, 255, 255, 1)" })
  //   .add("wall", "墙", 0, { show: true, typeShow: true, fill: "rgba(232, 21, 255, 0.25)", activeFill: "rgba(232, 211, 255, 1)" })
  //   .add("maintain", "检查口", 4, { show: true, typeShow: true, fill: "rgba(255, 150, 66, 0.25)", activeFill: "rgba(255, 150, 66, 1)" })
  //   .add("mask", "遮罩", 5, { show: true, typeShow: false })
  //   .add("warehouse", "库区", 6, { show: true, typeShow: false, fill: "rgba(95,149,255,0.05)", activeFill: "rgba(95,149,255, 1)" }),
  // areaEnum: new Enum().add("Material", "物料区", 0).add("Seize", "可抓区", 1).add("Put", "可放区", 2),
};
