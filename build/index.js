const { run } = require("runjs");
const chalk = require("chalk");
const config = require("../vue.config.js");
const rawArgv = process.argv.slice(2); // [ '--preview' ]
const args = rawArgv.join(" "); // --preview

// process.argv会返回一个数组
// - node build/index.js --preview
// - 第一个元素是 process.execPath 启动 Node.js 进程的可执行文件的绝对路径名
// - 正被执行的 JavaScript 文件的路径
// - 其余的元素是任何额外的命令行参数

// [
//   '/Users/yangliang/.nvm/versions/node/v14.15.1/bin/node',
//   '/Users/yangliang/Desktop/project/github/vue-element-admin/build/index.js',
//   '--preview'
// ]

// process.env.npm_config_preview 没找到
if (process.env.npm_config_preview || rawArgv.includes("--preview")) {
  const report = rawArgv.includes("--report");

  // 执行 build 打包项目
  run(`vue-cli-service build ${args}`);

  const port = 9526;
  const publicPath = config.publicPath;

  // 使用 node 启动一个端口为 9526 的服务
  var connect = require("connect");
  var serveStatic = require("serve-static"); // 静态资源管理器
  const app = connect();

  app.use(
    publicPath,
    serveStatic("./dist", {
      index: ["index.html", "/"],
    }),
  );

  app.listen(port, function () {
    console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}`));
    if (report) {
      console.log(chalk.green(`> Report at  http://localhost:${port}${publicPath}report.html`));
    }
  });
} else {
  run(`vue-cli-service build ${args}`);
}
