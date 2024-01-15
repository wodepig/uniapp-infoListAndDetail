<!-- 极简写法演示(vue) -->
<template>
<view>

 <view >
 	<z-paging  ref="paging" autowire-list-name="zList" autowire-query-name="zQuery">
		<view slot="top">
			<view class="uni-flex uni-row" style="display: flex;">
				<!-- <view class="text" style="width: 10rpx;"></view> -->
				<view  style="ma-webkit-flex: 1;flex: 1;">
					<uni-datetime-picker v-model="range" type="daterange" :clear-icon="true" rangeSeparator="至"
						@maskClick="maskClick" />
				</view>
				<view style="padding-left: 10rpx;"></view>
				<view  style="width: 150rpx;">
					<button @click="searchClice" style="margin-top: 5rpx;" class="mini-btn" type="primary" size="mini">搜索</button>
				</view>
				<!-- <view class="text" style="width: 10rpx;"></view> -->
			</view>
			<!-- 第二行 -->
			<view style="padding-top: 10rpx;"></view>
			<view class="uni-flex uni-row" style="display: flex;">
				<!-- <view class="text" style="width: 10rpx;"></view> -->
				<view >
					<w-select  v-model='infoTypeChooseValue' :list='infoTypeList' defaultValue="请选择信息类型"
						valueName='label' :showClose="true" keyName="value" @change='infoTypeChange'>
					</w-select>
				</view>
				<view style="padding-left: 10rpx;"></view>
				<view class="text">
					<input  v-model="pushCompany" class="uni-input" placeholder="请输入发布单位"
						maxlength=50 />
			
				</view>
				<!-- <view  style="width: 10rpx;"></view> -->
			</view>
			<view style="padding-top: 10rpx;"></view>
		</view>

 		<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
 	
 		<view class="demo-list">
 			<view class="demo-item" v-for="(item,index) in zList" :key="index" @click="itemClick(item)">
 				<view class="demo-item-main">
 					<view class="demo-item-title">{{item.title}}</view>
 					<view class="demo-item-subtitle" v-if="item.subTitle">{{item.subTitle}}</view>
 			
 				</view>
 				<image class="demo-item-more-img" src="../../static/more_icon.png"></image>
 			</view>
 		</view>
 		
 	</z-paging>
 </view>
	
 
	<!-- 搜索表单 -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				pushCompany: "",
				infoTypeChooseValue: "",
				infoTypeList: [{
					value: 'TJ1',
					label: '条件一'
				}, {
					value: 'TJ2',
					label: '条件二'
				}, {
					value: 'TJ3',
					label: '条件三'
				}],
				range: [],
				tabIndex: 0,
				zList: []
			}
		},
		methods: {
			infoTypeChange(e) {
				// console.log('chooseValue', this.chooseValue)
			},
			maskClick(e) {
				// console.log('时间选择器maskClick事件:', e);
			},
			searchClice(){
				// console.log("触发了搜索按钮");
				let searchData = {}
				if(this.range.length == 2){
					searchData.infoDateStart = this.range[0]
					searchData.infoDateEnd = this.range[1]
				}
				if(this.infoTypeChooseValue){
					searchData.infoType = this.infoTypeChooseValue
				}
				if(this.pushCompany){
					searchData.pushDempName = this.pushCompany
				}
				// console.log(searchData);
				this.$refs.paging.reload();
			},
			tabChange(index) {
				this.tabIndex = index;
				// 当切换tab或搜索时请调用组件的reload方法，请勿直接调用：queryList方法！！
				this.$refs.paging.reload();
			},
			zQuery(pageNo, pageSize) {
				// 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
				// 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				// 模拟请求服务器获取分页数据，请替换成自己的网络请求
				const params = {
					pageNum: pageNo,
					pageSize: pageSize,
					type: this.tabIndex + 1
				}
				if(this.range.length == 2){
					params.infoDateStart = this.range[0]
					params.infoDateEnd = this.range[1]
				}
				if(this.infoTypeChooseValue){
					params.infoType = this.infoTypeChooseValue
				}
				if(this.pushCompany){
					params.pushDeptName = this.pushCompany
				}
				this.$request.queryList(params).then(res => {
					// 将请求的结果数组传递给z-paging
					this.$refs.paging.complete(res.data.list);
				}).catch(res => {
					// 如果请求失败写this.$refs.paging.complete(false);
					// 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
					// 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
					this.$refs.paging.complete(false);
				})
			},
			itemClick(item) {
				 let infoData = JSON.stringify(item)
				 let newStr = infoData.replace(/%/g, '%25');
				uni.navigateTo({
					url: '/pages/detail/index?data=' + encodeURIComponent(newStr)
				})
				// console.log('点击了', item);
			}
		}
	}
</script>

<style>
	.demo-item {
		display: flex;
		align-items: center;
		border-bottom: #eeeeee solid 1px;
		padding: 20rpx 30rpx;
	}
	
	.demo-item-main {
		flex: 1;
		margin-right: 20rpx;
	}
	
	.demo-item-main>view:not(:last-child) {
		margin-bottom: 10rpx;
	}
	
	.demo-item-more-img {
		width: 24rpx;
		height: 24rpx;
	}
	
	.demo-item-title {
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.demo-item-subtitle {
		font-size: 26rpx;
		color: #666666;
	}
	 
	
	.text {
		background-color: #ebebeb;
		text-align: left;
		color: #777;
		font-size: 36rpx;
	}
	
	 
	 
</style>
