import request from "@/utils/request";

// http api
const urlLists = {
  /**
   * ! ---------------------- 文章 ----------------------
   */
  fetchList: `${process.env.VUE_APP_MOCK_PREFIX}/article/list`, // 获取列表
  fetchArticle: `${process.env.VUE_APP_MOCK_PREFIX}/article/detail`, // 获取文章
  fetchPv: `${process.env.VUE_APP_MOCK_PREFIX}/article/pv`, // 获取页面浏览量
  createArticle: `${process.env.VUE_APP_MOCK_PREFIX}/article/create`, // 创建文章
  updateArticle: `${process.env.VUE_APP_MOCK_PREFIX}/article/update`, // 更新文章
};

const fetchList = params => {
  return request.get(urlLists.fetchList, params);
};
const fetchArticle = (params = { id: "" }) => {
  return request.get(urlLists.fetchArticle, params);
};
const fetchPv = (params = { pv: "" }) => {
  return request.get(urlLists.fetchPv, params);
};
const createArticle = params => {
  return request.post(urlLists.createArticle, params);
};
const updateArticle = params => {
  return request.post(urlLists.updateArticle, params);
};

export default {
  fetchList,
  fetchArticle,
  fetchPv,
  createArticle,
  updateArticle,
};
