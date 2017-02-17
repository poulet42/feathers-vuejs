<template lang="pug">
	<div class="main">
		<sidebar @optionsChanged="setOptions"></sidebar>
		<section class="view section" @scroll="infiniteScroll">
			<h3 class="title" @click="fagget" >Home</h3>
			<hr>
			<div class='Movies columns is-multiline'>
				<div class="column is-one-quarter-widescreen is-one-third-desktop is-half-tablet is-one-two-mobile" v-for="movie in movies">
					<movie-card :movieData="movie"></movie-card>
				</div>
			</div>
		</template>

	<script>
		import { mapGetters, mapActions } from 'vuex';
		export default {
			components: {
				sidebar: require('../components/sidebar.vue'),
				movieCard: require('../components/movie-card.vue')
			},
			data () {
				return  {
					loading: false,
				}
			},
			computed: {
				...mapGetters({movies: 'getMovies', options: 'getOptions'}),
				slugify: function() {

				}
			},
			created () {
				this.$store.dispatch('listMovies', {mode: 'ADD'})
			},
			methods: {
				fagget() {
					alert('prout')
					// this.$store.dispatch('getPages')
				},
				setOptions(options) {
					console.log('setter called', options)
					this.$store.commit('SET_OPTIONS', options)
					this.getList('REPLACE')
				},
				getList(mode) {
					if (mode == "REPLACE")
						$('.view').animate({scrollTop: 0}, 600);
					this.$store.dispatch('listMovies', {mode});
				},
				infiniteScroll(e) {
					let movieGrid = e.target;
					if (movieGrid.scrollTop >= movieGrid.scrollHeight - movieGrid.offsetHeight && !this.loading && !this.options.keywords) {
						this.loading = true;
						this.$store.commit('SET_PAGE', this.options.page + 1)
						this.getList('ADD')
						this.$nextTick( () => {this.loading = false;})
					}
				}
			}
		}
	</script>

	<style lang="stylus">
		.Movie__genre
			display inline-block
			margin-right 5px
			&:last-child
				margin-right 0
		.view
			overflow-y auto
	</style>

