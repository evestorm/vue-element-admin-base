import request from "@/utils/request";

// http api
const urlLists = {
  getNews: "/api/services/app/YYPSiteArticle/GetSiteArticleInformation", // 获取新闻
};

const getNews = (params = { username: "" }) => {
  return request.post(urlLists.getNews, params, "https://tapi.yunyutian.cn");
};

export default {
  getNews,
};
