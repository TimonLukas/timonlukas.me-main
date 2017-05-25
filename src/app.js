import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueAsyncComputed from 'vue-async-computed';
import { sync } from 'vuex-router-sync';

import {
  Home,
  Notes
} from './components';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueAsyncComputed);

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
      path: '/Vorlesungen*',
      component: Notes
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

const escapeRegExp = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

String.prototype.replaceAll = function (search, replacement) {
  return this.replace(new RegExp(escapeRegExp(search), 'g'), replacement);
};
