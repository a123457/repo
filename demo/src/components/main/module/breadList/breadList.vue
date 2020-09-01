<template>
	<div class="bread-list">
		<ul>
			<li v-for="(item, i) in list" :key="`xzy-${i}`">
				<Icon type="ios-home" v-if="i==0" size="16" style="margin-top: -4px" />
				<router-link v-if="item.to" :to="item.to">{{showTitle(item)}}</router-link>
				<span v-else>{{showTitle(item)}}</span>
				<Icon class="singal" type="ios-arrow-forward" v-if="list.length > 1 && i < list.length - 1" size="16" style="margin-top: -4px" />
			</li>
			<li v-if="isHasId" :style="">{{isHasId}}</li>
		</ul>
		<div class="icon_reload">
			<Icon type="ios-sync" size="16" color="#33B1FF" @click="setLoad" />
				刷新
			</Col>
		</div>
	</div>
</template>
<script>
	import { showTitle } from '@/libs/util'
	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		inject:['reload'],
		methods: {
			showTitle(name) {
				return showTitle(name, this)
			},
			setLoad() {
     			this.reload();
    		},
		},
		computed: {
			isHasId() {
				if(this.list.length === 1) {
					return ""
				} else {
					return this.list.length && this.list[this.list.length - 1].router.params.id
				}
			}
		}
	}
</script>
<style scoped="scoped">
	.bread-list {
		height: 30px;
		width: 100%;
	}
	
	.bread-list li {
		float: left;
		list-style-type: none;
		padding-left: 5px;
		height: 30px;
		line-height: 30px;
	}
	
	.singal {
		padding-left: 5px;
	}
	.icon_reload{
	   height:30px;
	   width:60px;
	   line-height:30px;
	   position: fixed;
       top: 80px;
       right: 17px;
       cursor:pointer;
	}
</style>