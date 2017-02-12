<template>
	<div id="app">
		<header-nav></header-nav>
		<router-view></router-view>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		name: 'app',
		components: {
			headerNav: require('./components/headerNav.vue'),
			sidebar: require('./components/sidebar.vue')
		},
		methods: mapActions(['authenticate']),
		created () { 
			this.authenticate().catch(err => {});
		}
	}
</script>

<style lang="stylus">
	@import "~assets/styles/style.styl";
</style>
