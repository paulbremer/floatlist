import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import List from './components/List';

Vue.use(VueRouter);

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/', component: List },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '*', component: List },
]

const router = new VueRouter({
  routes,
  hashbang: false,
  history: true,
  mode: 'history',
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App },
  data: {
    singleItem: {
      location: {},
    },
    items: null,
    locationImage: '',
  },
});
