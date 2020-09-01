<template>
     <Drawer
	   title="选择角色"
	   :mask-closable="false"
	   v-model="modalVal"
	   :width="width"
	   on-visible-change="visible">
	 
      <Input v-xzy="changeVal"></Input>
      <div class="demo-drawer-footer">
        <Button type="default" style="margin-right: 8px" @click="canDrawer">返回</Button>
      </div>
    </Drawer>
</template>

<script>
	export default{
		props:{
			isShowInfo:{
				type:Boolean,
				default:() => false
			},
			width:{
				type:Number,
				default:800
			}
		},
		data() {
			return {
				
			}
    },
    created(){
    },
	computed:{
		modalVal:{
			get:function(){
				return this.isShowInfo
			},
			set:function(value){
				this.$emit('update:isShowInfo', value)
			}
		}
	},
	methods:{
		visible(value){
			console.log(value)
		},
		canDrawer(){
			this.modalVal = false
      },
      changeVal(){
        return 'xzy is cool'
      }
	}

	}
</script>

<style>

</style>
