import $demo from "@/api/demo";

const state = {
  name: "vuex->demo",
  newsInfo: {},
};

const getters = {
  getName(state) {
    return state.name;
  },
};

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_NEWS_INFO: (state, newsInfo) => {
    state.newsInfo = newsInfo;
  },
};

const actions = {
  // 获取信息信息
  getNewsInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      $demo
        .getNews(data)
        .then(response => {
          const { data } = response;
          commit("SET_NEWS_INFO", data);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
