import request from "@/utils/request";

export function searchUser(name) {
  return request({
    url: `${process.env.VUE_APP_MOCK_PREFIX}/search/user`,
    method: "get",
    params: { name },
  });
}

export function transactionList(query) {
  return request({
    url: `${process.env.VUE_APP_MOCK_PREFIX}/transaction/list`,
    method: "get",
    params: query,
  });
}
