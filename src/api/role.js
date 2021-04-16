import request from "@/utils/request";

// http api
const urlLists = {
  /**
   * ! ---------------------- 用户角色 ----------------------
   */
  getRoutes: `${process.env.VUE_APP_MOCK_PREFIX}/routes`, // 获取路由
  getRoles: `${process.env.VUE_APP_MOCK_PREFIX}/roles`, // 获取角色
  addRole: `${process.env.VUE_APP_MOCK_PREFIX}/role`, // 添加角色
  updateRole: `${process.env.VUE_APP_MOCK_PREFIX}/role`, // 更新角色
  deleteRole: `${process.env.VUE_APP_MOCK_PREFIX}/role`, // 删除角色
};

const getRoutes = params => {
  return request.get(urlLists.getRoutes, params);
};
const getRoles = params => {
  return request.get(urlLists.getRoles, params);
};
const addRole = params => {
  return request.post(urlLists.addRole, params);
};
const updateRole = (params = { id: "" }) => {
  return request.put(urlLists.updateRole, params);
};
const deleteRole = (params = {}) => {
  return request.delete(urlLists.deleteRole, params);
};

export default {
  getRoutes,
  getRoles,
  addRole,
  updateRole,
  deleteRole,
};

// export function updateRole(id, data) {
//   return request({
//     url: `${process.env.VUE_APP_MOCK_PREFIX}/role/${id}`,
//     method: "put",
//     data,
//   });
// }

// export function deleteRole(id) {
//   return request({
//     url: `${process.env.VUE_APP_MOCK_PREFIX}/role/${id}`,
//     method: "delete",
//   });
// }
