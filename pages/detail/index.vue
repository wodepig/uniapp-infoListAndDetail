<template>
	<view >
		<h2 style="text-align: center;">{{item.title}}</h2>
		<mp-html :tag-style="tagStyle" :scroll-table="true" :content="item.content" />
	
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
				tagStyle: {
				   table: 'border-top: 1px solid gray; border-left: 1px solid gray;',
				   th: 'background-color: #f5f2f0;border-right: 1px solid gray; border-bottom: 1px solid gray;',
				   td: 'border-right: 1px solid gray; border-bottom: 1px solid gray;'
				},
				item: {},
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
