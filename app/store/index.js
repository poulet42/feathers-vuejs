import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import authentication from './modules/authentication';

export default new Vuex.Store({
  modules: {
    authentication
  },
  strict: process.env.NODE_ENV !== 'production'
});
