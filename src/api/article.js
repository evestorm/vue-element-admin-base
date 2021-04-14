import request from "@/utils/request";

export function fetchList(query) {
  return request({
    url: `${process.env.VUE_APP_MOCK_PREFIX}/article/list`,
    method: "get",
    params: query,
  });
}

export function fetchArticle(id) {
  return request({
    url: `${process.env.VUE_APP_MOCK_PREFIX}/article/detail`,
    method: "get",
    params: { id },
  });
}

export function fetchPv(pv) {
  return request({
    url: `${process.env.VUE_APP_MOCK_PREFIX}/article/pv`,
    method: "get",
    params: { pv },
  });
}

export function createArticle(data) {
  return request({
    url: `${process.env.VUE_APP_MOCK_PREFIX}/article/create`,
    method: "post",
    data,
  });
}

export function updateArticle(data) {
  return request({
    url: `${process.env.VUE_APP_MOCK_PREFIX}/article/update`,
    method: "post",
    data,
  });
}
