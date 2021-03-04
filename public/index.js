
import Vue from 'vue';
import VueRouter from 'vue-router';

import 'regenerator-runtime';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import router from './router.js';
import checkUrlPath from './utils/checkUrlPath.js';

Vue.use(VueRouter);

checkUrlPath();

const app = new Vue({
  el: '#app-root',
  router,
});

export default app;