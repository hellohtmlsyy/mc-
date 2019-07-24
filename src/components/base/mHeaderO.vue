<template>
	<div class="mHeaderO">
		<div class="leftM" @click="goBack">
			<x-icon type="ios-arrow-left" size="26" v-show="icoBack"></x-icon>
			<span>{{title ? title :"返回"}}</span>
		</div>
			<slot name="centerM"></slot>
		<div class="rightM">
			<slot name="rightM"></slot>
		</div>
	</div>
</template>

<script>
	import {lastPage} from '@/common/js/appFun.js'

	export default{
		props:['title',"icoBack"],
		methods:{
			goBack(){
				lastPage()
			}
		}
	}
</script>

<style>
	.mHeaderO{
		display:flex;
		/*background: #00a5f5;*/
		height:46px;
		color: #fff;
		font-size: 18px;
		padding: 0 0.1rem;
		align-items: center;
		justify-content:space-between;
	}
	.mHeaderO .leftM{
		flex: 1;
	}
	.mHeaderO .vux-x-icon {
		vertical-align: top;
	  	fill: #fff;

	}
	.mHeaderO .centerM{
		display: flex;
    	flex-grow: 1;
    	justify-content: center;
      flex:1;
      text-align:center;
	}
	.mHeaderO .rightM{
		flex: 1;
    text-align:right;
	}
</style>
