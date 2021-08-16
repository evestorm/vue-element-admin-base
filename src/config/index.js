import appConfigDev from "@/config/config.dev.js";
import appConfigTest from "@/config/config.test.js";
import appConfigProd from "@/config/config.prod.js";

let appConfig = {
  // 图片上传地址前缀
  imgPrefix: "https://hxtms.obs.cn-south-1.myhuaweicloud.com/driverHome/userIcon/",
};
console.log("process.env.VUE_APP_ENV", process.env.VUE_APP_ENV);
if (process.env.VUE_APP_ENV === "production") {
  appConfig = Object.assign(appConfig, appConfigProd);
} else if (process.env.VUE_APP_ENV === "test") {
  appConfig = Object.assign(appConfig, appConfigTest);
} else {
  appConfig = Object.assign(appConfig, appConfigDev);
}

export default appConfig;
