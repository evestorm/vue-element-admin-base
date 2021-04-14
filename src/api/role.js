import request from "@/utils/request";

export function getRoutes() {
  return request({
    url: `${process.env.VUE_APP_MOCK_PREFIX}/routes`,
    method: "get",
  });
}

export function getRoles() {
  return request({
    url: `${process.env.VUE_APP_MOCK_PREFIX}/roles`,
    method: "get",
  });
}

export function addRole(data) {
  return request({
    url: `${process.env.VUE_APP_MOCK_PREFIX}/role`,
    method: "post",
    data,
  });
}

export function updateRole(id, data) {
  return request({
    url: `${process.env.VUE_APP_MOCK_PREFIX}/role/${id}`,
    method: "put",
    data,
  });
}

export function deleteRole(id) {
  return request({
    url: `${process.env.VUE_APP_MOCK_PREFIX}/role/${id}`,
    method: "delete",
  });
}
