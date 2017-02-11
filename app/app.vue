<template>
	<div id="app">
		<header-nav></header-nav>
		<input type="text">
		<div class="main">
			<sidebar></sidebar>
			<router-view></router-view>
		</div>
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
		created () { this.authenticate().catch(err => {}); }
	}
</script>

<style lang="stylus">
	@import "~assets/styles/style.styl";
</style>
