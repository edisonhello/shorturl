
import Vue from 'vue';
import Vuex from 'vuex';

import aliasRecord from './modules/aliasRecord.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    aliasRecord,
  },
});

export default store;