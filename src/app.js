import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';

import {
  Home
} from './components';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {}
});

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
});

sync(store, router);

Vue({
  el: '#app',
  store,
  router
});
