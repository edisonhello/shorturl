
const store = {
  namespaced: true,
  state: () => {
    return {
      alias: '',
      target: '',
    };
  },
  getters: {

  },
  actions: {

  },
  mutations: {
    setAlias(state, newAlias) {
      state.alias = newAlias;
    },
    setTarget(state, newTarget) {
      state.target = newTarget;
    },
  },
};

export default store;