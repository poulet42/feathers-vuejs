<template>
  <div id="app">
    <navbar brand="Feathers / Vue.js"></navbar>
    <div class="container mt-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import 'bootstrap';
  import { mapActions } from 'vuex';
  export default {
    name: 'app',
    components: {
      navbar: require('./components/navbar.vue')
    },
    methods: mapActions(['authenticate']),
    created () { this.authenticate().catch(err => {}); }
  }
</script>

<style lang="scss" rel="stylesheet/svss">
  @import "~assets/scss/style.scss";

</style>
