import $ from 'jquery';
import Vue from 'vue';
import App from './app.vue';
// Configure Vue router and Vuex store
import router from './router';
import store from './store';
import {sync} from 'vuex-router-sync';
sync(store, router);
window.$ = $;
export default new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
