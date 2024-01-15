<template>
	<view >
		<h2 style="text-align: center;">{{item.title}}</h2>
		<mp-html :scroll-table="true" :content="item.content" />
	
	</view>
	
</template>

<script>
	export default {
		onLoad(query){
			if(! query  || JSON.stringify(query) == "{}"){
				return
			}
			let infoData = decodeURIComponent(query.data)
			this.item  = JSON.parse(infoData)
		
		},
		data() {
			return {
				item: {},
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
