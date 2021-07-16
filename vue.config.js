"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || "后台管理系统"; // 页面标题

// 如果你的端口设置为80,
// 使用管理员权限来执行命令行。
// 举个例子， Mac: sudo npm run
// 你可以通过下面的方法改变端口:
// port = 9527 npm run dev 或者 npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527; // dev port

const proxyTargetMap = {
  // prod: 'http://10.248.24.118:9083/tms-facdel', // 刘天赐
  // prod: 'http://10.248.61.27:9083/tms-facdel',
  prod: "http://10.248.61.136:9083/tms-facdel",
  // prod: 'http://10.248.24.118:9083/tms-facdel',
  randy: "",
  peter: "",
};

// 所有配置项都可以在 https://cli.vuejs.org/config/ 找到解释
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * 你将需要设置 publicPath 如果你计划部署站点到一个子目录
   * 例如 GitHub Pages. 如果你计划部署到 https://foo.github.io/bar/,
   * 然后publicPath应该设置为 "/bar/".
   * 在大多数情况下,请使用 '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: "0.0.0.0",
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/tms-facdel/beltWagon": {
        target: "http://10.248.10.118:8130/beltWagon",
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/tms-facdel/beltWagon": "",
        },
      },
      "/tms-facdel": {
        target: proxyTargetMap.prod,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/tms-facdel": "",
        },
      },
    },
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  chainWebpack(config) {
    // 它可以提高首屏加载的速度,建议预加载
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial",
      },
    ]);

    // 有许多页时,它会导致太多无意义的请求
    config.plugins.delete("prefetch");

    // 设置 svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // 只打包初始化时依赖的第三方
          },
          elementUI: {
            name: "chunk-elementUI", // 把elementUI分割成一个单一的包
            priority: 20, // 权重必须大于libs和app，否则将打包到libs或app中
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // 为了适应cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // 可以定制你的规则
            minChunks: 3, // 最小公共数
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });
  },
};
