<template>
  <div id="app">
    <div class="container">
      <higurlz></higurlz>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    name: 'app',
    components: {
      higurlz: require('./components/higurlz.vue')
    },
    methods: mapActions(['authenticate']),
    created () { this.authenticate().catch(err => {}); }
  }
</script>

<style lang="scss" rel="stylesheet/svss">
  @import "~assets/scss/style.scss";

</style>
