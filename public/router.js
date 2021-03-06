
import VueRouter from 'vue-router';

import RootComponent from './components/index.vue';
import PreviewComponent from './components/preview.vue';

const routes = [
  { path: '/', component: RootComponent },
  { path: '/preview', component: PreviewComponent },
];

const router = new VueRouter({
  routes,
});

export default router;