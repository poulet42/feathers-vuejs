<template lang="pug">
	.Sidebar
		.Sidebar__module.control
			label.label Genres {{ getGenre }}
			span.select.is-fullwidth
				select.is-fullwidth(v-model='selectedGenre' @change="optionsChange" ref="selectGenre")
					option(@click="a(null)") Select a genre
					option(v-for="genre in genres") {{ genre }}
</template>

<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	export default {
		name: 'sidebar',
		computed: {
			...mapGetters({getGenre: 'getGenre'}),
			selectedGenre () {return this.getGenre}
		},
		data () {
			return {
				genres: ['Action', 'Adventure','Animation','Biography','Comedy','Crime','Documentary','Drama','Family','Fantasy','Film-noir','History','Horror','Music','Musical','Mystery','Romance','Sci-Fi','Sport','Thriller','War','Western']
			};
		},
		methods: {
			optionsChange () {
				this.$emit('optionsChanged', {
					page: 1,
					genre: this.genres[this.$refs.selectGenre.selectedIndex - 1]
				});

			}
		},
	};
</script>

<style lang="stylus" scoped>
	.Sidebar
		width 200px
		padding 20px
		position relative
		z-index 4
		box-shadow 0px 9px 9px rgba(179,179,179,0.4)
		@media screen and (max-width: 640px)
			position absolute
			top 0
			left 0
			right 0
			bottom 0
			transform translateX(-100%)
</style>