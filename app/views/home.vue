<template lang="pug">
	<section class="view section" @scroll="infiniteScroll">
		<h3 class="title">Home</h3>
		<hr>
		<div class='Movies columns is-multiline'>
			<div class="column is-one-quarter-desktop is-half-tablet is-one-two-mobile" v-for="movie in movies">
				<div class="card has-overlay">
					<div class="card-image">
						<figure class="image is-4by6">
							<img :src="movie.large_cover_image" alt="Image">
						</figure>
						<small class='card-meta is-top-right'>{{ movie.year }}</small>
						<div class='card-meta is-bottom-left'>
							<small><a class="tag is-white" v-for="genre in movie.genres" @click="setGenre(genre)">{{ genre }}</a></small>
						</div>
						<div class="card-overlay is-black">
							<div class="content">
								<p class="title is-4">Synopsis</p>
								<hr>
								<article>{{ movie.summary | ellipsis(400) }}</article>
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
	</template>

	<script>
		import { mapGetters, mapActions } from 'vuex';
		export default {
			data () {
				return  {
					loading: false,
					options: {
						page: 1,
						genre: '',
					}
				}
			},
			filters: {
				ellipsis: function(str, maxChars = 200) {
					return str.length > maxChars ? str.slice(0, maxChars - 3) + '...' : str
				}
			},
			computed: mapGetters({movies: 'getMovies'}),
			created () {
				console.log('home created', 'ADD', {page: this.options.page})
				this.$store.dispatch('listMovies', {mode: 'ADD'})
			},
			methods: {
				setGenre(newGenre) {
					$('.view').animate({
						scrollTop: 0
					}, 600);
					this.options.genre = newGenre;
					this.$store.dispatch('listMovies', {mode: 'REPLACE', query: this.options});
				},
				infiniteScroll(e) {
					let movieGrid = e.target;
					if (movieGrid.scrollTop >= movieGrid.scrollHeight - movieGrid.offsetHeight && !this.loading) {
						this.loading = true;
						this.options.page++
						this.$store.dispatch('listMovies', {mode: 'ADD', query: this.options});
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

