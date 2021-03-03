
import VueRouter from 'vue-router';

import RootComponent from './components/index.vue';

const routes = [
  { path: '/', component: RootComponent },
]

const router = new VueRouter({
  routes,
})

export default router;