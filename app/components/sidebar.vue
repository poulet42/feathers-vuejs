<template lang="pug">
.Sidebar
	.Sidebar__module
</template>

<script>
export default {

  name: 'sidebar',

  data () {
    return {

    };
  }
};
</script>

<style lang="stylus" scoped>
	.Sidebar
		width 200px
		// background-color #222
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