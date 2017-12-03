<template>
	<div>
		<search-list></search-list>	
		<footer-nav></footer-nav>
	</div>
</template>

<script>
	import SearchList from '@/components/SearchList.vue'
	import FooterNav from '@/components/FooterNav.vue'
	export default {
		components: {
            SearchList,
            FooterNav
        },
		data () {
			return {
			}
		},
		created () {
		}
	}
</script>
<style >
	
</style>