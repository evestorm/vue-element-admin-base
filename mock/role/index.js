const Mock = require("mockjs");
const { deepClone } = require("../utils");
const { asyncRoutes, constantRoutes } = require("./routes.js");

const routes = deepClone([...constantRoutes, ...asyncRoutes]);

const roles = [
  {
    key: "admin",
    name: "超管",
    description: "超管. 有访问和操作所有页面的权限.",
    routes: routes,
  },
  {
    key: "editor",
    name: "管理员",
    description: "普通管理员. 可以看到所有页面除了「配置管理员」的页面",
    routes: routes.filter(i => i.path !== "/permission"), // just a mock
  },
  {
    key: "visitor",
    name: "访客",
    description: "只是个访客. 只能看到主页和文档页面",
    routes: [
      {
        path: "",
        redirect: "home",
        children: [
          {
            path: "home",
            name: "Home",
            meta: { title: "首页", icon: "dashboard" },
          },
        ],
      },
    ],
  },
];

const baseUrl = "/vue-element-admin";

module.exports = [
  // mock get all routes form server
  {
    url: `${baseUrl}/routes`,
    type: "get",
    response: _ => {
      return {
        code: 20000,
        data: routes,
      };
    },
  },

  // mock get all roles form server
  {
    url: `${baseUrl}/roles`,
    type: "get",
    response: _ => {
      return {
        code: 20000,
        data: roles,
      };
    },
  },

  // add role
  {
    url: `${baseUrl}/role`,
    type: "post",
    response: {
      code: 20000,
      data: {
        key: Mock.mock("@integer(300, 5000)"),
      },
    },
  },

  // update role
  {
    url: `${baseUrl}/role/[A-Za-z0-9]`,
    type: "put",
    response: {
      code: 20000,
      data: {
        status: "success",
      },
    },
  },

  // delete role
  {
    url: `${baseUrl}/role/[A-Za-z0-9]`,
    type: "delete",
    response: {
      code: 20000,
      data: {
        status: "success",
      },
    },
  },
];
