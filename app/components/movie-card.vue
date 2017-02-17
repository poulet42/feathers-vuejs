<template>
	<div class="card has-overlay bump">
		<div class="card-image">
			<figure class="image is-4by6">
				<img :src="movieData.images.poster" alt="Image">
			</figure>
			<small class='card-meta is-top-right'>{{ movieData.year }}</small>
			<div class='card-meta is-bottom-left'>
				<small><a class="tag is-white" v-for="genre in movieData.genres" @click="setOptions({page: 1, genre})">{{ genre }}</a></small>
			</div>
			<div class="card-overlay is-black">
				<div class="content">
					<p class="title is-4">Synopsis</p>
					<hr>
					<article>{{ movieData.synopsis | ellipsis(400) }}</article>
				</div>
			</div>
		</div>
		<div class="card-content is-layer-2">
			<div class="content">
				<p class="title is-4">{{ movieData.title }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			movieData: {
				required: true,
				type: Object
			}
		},
		filters: {
			ellipsis: function(str, maxChars = 200) {
				return str.length > maxChars ? str.slice(0, maxChars - 3) + '...' : str
			}
		},
		name: 'movie-card',

		data () {
			return {

			};
		}
	};
</script>

<style lang="css" scoped>
</style>