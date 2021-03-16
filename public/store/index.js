
import Vue from 'vue';
import Vuex from 'vuex';

import forIn from 'lodash/forIn';

import aliasRecord from './modules/aliasRecord.js';

Vue.use(Vuex);

const modules = {
  aliasRecord,
};

const store = new Vuex.Store({
  modules,
  mutations: {
    initializeStore(state) {
      forIn(modules, (module, moduleName) => {
        module.onInit?.(this, state);
      });
    }
  }
});

store.subscribe((mutation, state) => {
  if (mutation.type === 'route/ROUTE_CHANGED') return;
  if (mutation.type === 'initializeStore') return;

  console.log(mutation, state);
  forIn(modules, (module, moduleName) => {
    module.onMutation?.(this, mutation, state);
  });
})

export default store;