
import { getRestoreState, getStoreStateOnMutate } from "../localStorage.js";

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
  onInit: getRestoreState('aliasRecord'),
  onMutation: getStoreStateOnMutate('aliasRecord'),
};

export default store;