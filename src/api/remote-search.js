import request from "@/utils/request";

// http api
const urlLists = {
  /**
   * ! ---------------------- 远程搜索 ----------------------
   */
  searchUser: `${process.env.VUE_APP_MOCK_PREFIX}/search/user`, // 搜索用户
  transactionList: `${process.env.VUE_APP_MOCK_PREFIX}/transaction/list`, // 事物列表
};

const searchUser = (params = { name: "" }) => {
  return request.get(urlLists.searchUser, params);
};
const transactionList = params => {
  return request.get(urlLists.transactionList, params);
};

export default {
  searchUser,
  transactionList,
};

// export function searchUser(name) {
//   return request({
//     url: `${process.env.VUE_APP_MOCK_PREFIX}/search/user`,
//     method: "get",
//     params: { name },
//   });
// }

// export function transactionList(query) {
//   return request({
//     url: `${process.env.VUE_APP_MOCK_PREFIX}/transaction/list`,
//     method: "get",
//     params: query,
//   });
// }
