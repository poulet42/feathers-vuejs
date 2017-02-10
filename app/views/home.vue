<template lang="pug">
	<section class="view section" @scroll="infiniteScroll">
		<h3 class="title">Home</h3>
		<hr>
		<div class='Movies columns is-multiline'>
			<div class="column is-one-quarter-desktop is-half-tablet is-one-two-mobile" v-for="movie in movies">
				<div class="card">
					<div class="card-image">
						<figure class="image is-4by6">
							<img :src="movie.large_cover_image" alt="Image">
						</figure>
					</div>
					<div class="card-content">
						<div class="media">
							<div class="media-content">
								<p class="title is-4">{{ movie.title }}</p>
							</div>
						</div>

						<div class="content">
							<article>{{ movie.summary }}</article>
							<a class="Movie__genre"v-for="genre in movie.genres" @click="setGenre(genre)">{{ genre }}</a>
							<br>
							<small>{{ movie.year }}</small>
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
		data () {
			return  {
				options: {
					page: 1,
					genre: '',
				}
			}
		},
		computed: mapGetters({movies: 'getMovies'}),
		created () {
			console.log('home created', {page: this.page})
			this.$store.dispatch('listMovies')
		},
		methods: {
			setGenre(newGenre) {
				this.options.genre = newGenre;
			},
			infiniteScroll(e) {
				let movieGrid = e.target,
				offsetBottom = 200
				setTimeout( () => {
					if (movieGrid.scrollTop + offsetBottom >= movieGrid.scrollHeight - movieGrid.offsetHeight) {
						this.page++
						this.$store.dispatch('listMovies', this.options)
					}
				}, 500)
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
	.image .is-4by6
		padding-bottom 150%
</style>

