
import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';

import 'regenerator-runtime';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import router from './router.js';
import store from './store/index.js';
import checkUrlPath from './utils/checkUrlPath.js';

Vue.use(VueRouter);

checkUrlPath();

sync(store, router);

const app = new Vue({
  el: '#app-root',
  router,
  store,
  beforeCreate() {
    this.$store.commit('initializeStore');
  },
});

export default app;