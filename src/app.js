import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';

import {
  Home,
  Filebrowser
} from './components';

Vue.use(Vuex);
Vue.use(VueRouter);

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
    },
    {
      path: '/vorlesungen',
      component: Filebrowser
    }
  ]
});

sync(store, router);

new Vue({ // eslint-disable-line
  el: '#app',
  store,
  router,
  mounted () {
    const burger = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  }
});
