import request from "@/utils/request";

export function login(data) {
  return request({
    url: `${process.env.VUE_APP_MOCK_PREFIX}/user/login`,
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    url: `${process.env.VUE_APP_MOCK_PREFIX}/user/info`,
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: `${process.env.VUE_APP_MOCK_PREFIX}/user/logout`,
    method: "post",
  });
}
