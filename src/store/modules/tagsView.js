// visitedViews : 用户访问过的页面 就是标签栏导航显示的一个个 tag 数组集合
// cachedViews : 实际 keep-alive 的路由。可以在配置路由的时候通过 meta.noCache 来设置是否需要缓存这个路由 默认都缓存。配置文档
const state = {
  visitedViews: [],
  cachedViews: [],
};

const mutations = {
  // 添加访问视图
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return;
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || "no-name",
      }),
    );
  },
  // 添加缓存视图
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return;
    // route 路由的配置 noCache 为 false 并且 环境变量不等于 development 时，才缓存（避免 npm run dev 时更新文件，页面不刷新问题）
    if (!view.meta.noCache && process.env.NODE_ENV !== "development") {
      state.cachedViews.push(view.name);
    }
  },
  // 删除访问视图
  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },
  // 删除缓存视图
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name);
    index > -1 && state.cachedViews.splice(index, 1);
  },
  // 删除其他访问视图
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path;
    });
  },
  // 删除所有访问视图
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view.name);
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1);
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = [];
    }
  },
  // 删除所有访问视图
  DEL_ALL_VISITED_VIEWS: state => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix);
    state.visitedViews = affixTags;
  },
  // 删除所有缓存视图
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = [];
  },
  // 更新访问视图
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  },
};

const actions = {
  // 添加视图
  addView({ dispatch }, view) {
    dispatch("addVisitedView", view);
    dispatch("addCachedView", view);
  },
  // 添加访问视图
  addVisitedView({ commit }, view) {
    commit("ADD_VISITED_VIEW", view);
  },
  // 添加缓存视图
  addCachedView({ commit }, view) {
    commit("ADD_CACHED_VIEW", view);
  },
  // 删除视图
  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch("delVisitedView", view);
      dispatch("delCachedView", view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      });
    });
  },
  // 删除访问视图
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit("DEL_VISITED_VIEW", view);
      resolve([...state.visitedViews]);
    });
  },
  // 删除缓存视图
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit("DEL_CACHED_VIEW", view);
      resolve([...state.cachedViews]);
    });
  },
  // 删除其他视图
  delOthersViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch("delOthersVisitedViews", view);
      dispatch("delOthersCachedViews", view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      });
    });
  },
  // 删除其他访问视图
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit("DEL_OTHERS_VISITED_VIEWS", view);
      resolve([...state.visitedViews]);
    });
  },
  // 删除其他缓存视图
  delOthersCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit("DEL_OTHERS_CACHED_VIEWS", view);
      resolve([...state.cachedViews]);
    });
  },
  // 删除所有视图
  delAllViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch("delAllVisitedViews", view);
      dispatch("delAllCachedViews", view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      });
    });
  },
  // 删除所有访问视图
  delAllVisitedViews({ commit, state }) {
    return new Promise(resolve => {
      commit("DEL_ALL_VISITED_VIEWS");
      resolve([...state.visitedViews]);
    });
  },
  // 删除所有缓存视图
  delAllCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit("DEL_ALL_CACHED_VIEWS");
      resolve([...state.cachedViews]);
    });
  },
  // 更新访问视图
  updateVisitedView({ commit }, view) {
    commit("UPDATE_VISITED_VIEW", view);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
