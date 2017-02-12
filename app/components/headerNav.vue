<template>
	<header class='Header'>
		<a href="#" class="header-link">
			<i class='fa fa-burger'></i>
		</a>
	</header>
</template>

<script>
export default {

  name: 'headerNav',

  data () {
    return {
    };
  }
};
</script>

<style lang="stylus" scoped>
.Header
	height 80px
	width 100%
	background-color #fff
	box-shadow 0px 0px 10px rgba(52,52,52,0.1)
	position relative
	color #666
	display flex
	align-items center
	padding 20px
</style>