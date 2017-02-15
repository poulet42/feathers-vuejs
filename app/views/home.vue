<template lang="pug">
	<div class="main">
		<sidebar @optionsChanged="setOptions"></sidebar>
		<section class="view section" @scroll="infiniteScroll">
			<h3 class="title" @click="fagget" >Home</h3>
			<hr>
			<div class='Movies columns is-multiline'>
				<div class="column is-one-quarter-widescreen is-one-third-desktop is-half-tablet is-one-two-mobile" v-for="movie in movies">
					<div class="card has-overlay bump">
						<div class="card-image">
							<figure class="image is-4by6">
								<img :src="movie.images.poster" alt="Image">
							</figure>
							<small class='card-meta is-top-right'>{{ movie.year }}</small>
							<div class='card-meta is-bottom-left'>
								<small><a class="tag is-white" v-for="genre in movie.genres" @click="setOptions({page: 1, genre})">{{ genre }}</a></small>
							</div>
							<div class="card-overlay is-black">
								<div class="content">
									<p class="title is-4">Synopsis</p>
									<hr>
									<article>{{ movie.synopsis | ellipsis(400) }}</article>
								</div>
							</div>
						</div>
						<div class="card-content is-layer-2">
							<div class="content">
								<p class="title is-4">{{ movie.title }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</template>

	<script>
		import { mapGetters, mapActions } from 'vuex';
		export default {
			components: {
				sidebar: require('../components/sidebar.vue')
			},
			data () {
				return  {
					loading: false,
				}
			},
			filters: {
				ellipsis: function(str, maxChars = 200) {
					return str.length > maxChars ? str.slice(0, maxChars - 3) + '...' : str
				}
			},
			computed: mapGetters({movies: 'getMovies', options: 'getOptions'}),
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
					if (movieGrid.scrollTop >= movieGrid.scrollHeight - movieGrid.offsetHeight && !this.loading) {
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

