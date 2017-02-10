import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import authentication from './modules/authentication';
import movies from './modules/movies';

export default new Vuex.Store({
  modules: {
    authentication,
    movies
  },
  strict: process.env.NODE_ENV !== 'production'
});
