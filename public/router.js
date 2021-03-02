
import VueRouter from 'vue-router';

import RootComponent from './components/index.vue';

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/', component: RootComponent },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
]

const router = new VueRouter({
  routes
})

export default router;