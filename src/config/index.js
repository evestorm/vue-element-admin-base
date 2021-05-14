import appConfigDev from "@/config/config.dev.js";
import appConfigTest from "@/config/config.test.js";
import appConfigProd from "@/config/config.prod.js";

let appConfig = {
  // 图片上传地址前缀
  imgPrefix: "https://hxtms.obs.cn-south-1.myhuaweicloud.com/driverHome/userIcon/",
};

if (process.env.NODE_ENV === "production") {
  appConfig = Object.assign(appConfig, appConfigProd);
} else if (process.env.NODE_ENV === "test") {
  appConfig = Object.assign(appConfig, appConfigTest);
} else {
  appConfig = Object.assign(appConfig, appConfigDev);
}

export default appConfig;
