const tokens = {
  admin: {
    token: "admin-token",
  },
  editor: {
    token: "editor-token",
  },
};

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "I am a super administrator",
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Super Admin",
  },
  "editor-token": {
    roles: ["editor"],
    introduction: "I am an editor",
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal Editor",
  },
};

const baseUrl = process.env.VUE_APP_MOCK_PREFIX;

module.exports = [
  // 用户登录
  {
    url: `${baseUrl}/user/login`,
    type: "post",
    response: config => {
      const { username } = config.body;
      console.log(username);
      const token = tokens[username];

      // 模拟账号登录失败时的错误
      if (!token) {
        return {
          code: 60204,
          message: "帐号或密码错误",
        };
      }

      return {
        code: 20000,
        data: token,
      };
    },
  },

  // 获取用户信息
  {
    url: `${baseUrl}/user/info\.*`,
    type: "get",
    response: config => {
      const { token } = config.query;
      const info = users[token];

      // 模拟错误
      if (!info) {
        return {
          code: 50008,
          message: "登录失败，无法获取用户信息",
        };
      }

      return {
        code: 20000,
        data: info,
      };
    },
  },

  // 用户登出
  {
    url: `${baseUrl}/user/logout`,
    type: "post",
    response: _ => {
      return {
        code: 20000,
        data: "success",
      };
    },
  },
];
