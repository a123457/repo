<template>
	<Modal width='500px' v-model="status" title="Common Modal dialog box title" @on-ok="ok" @on-cancel="cancel">
		<Form ref="formInline" :model="baseInfo" :rules="ruleInline" inline>
			<FormItem prop="title">
				<Input type="text" v-model="baseInfo.title" :placeholder="$t('titles')">
				</Input>
			</FormItem>
			<FormItem prop="action">
				<Input type="text" v-model="baseInfo.action" :placeholder="$t('actions')">
				</Input>
			</FormItem>
		</Form>
	</Modal>
</template>

<script>
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: () => false
			}
		},
		computed: {
			status: {
				get: function() {
					return this.isShow
				},
				set: function(val) {
					console.log(val)
					this.$emit('updata:isShow', val)
				}
			}
		},
		data() {
			return {
				baseInfo: {
					title: '',
					action: ''
				},
			ruleInline:{
 					title: [
                        { required: true, message: '快捷操作标题不能为空', trigger: 'blur' }
                    ],
                    action: [
                        { required: true, message: '快捷操作链接不能为空', trigger: 'blur' }
                    ]
			}
		 }	
		},
		methods: {
			ok() {
			  alert(1)	
			  var _this = this	
			},
			cancel() {
				this.$refs['formInline'].resetFields();
			}
		}
	}
</script>

<style>

</style>