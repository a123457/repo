<style lang="less" scoped>
    @import "./common.less";
</style>
<template>
  <div>
      <Row>
        <Button icon="md-download" :loading="exportLoading" @click="exportExcel">导出文件</Button>
      </Row>
  </div>
</template>
<script>
import excel from '@/libs/excel'
export default {
  name: 'export-excel',
  props:{
  	list:{
  		type:Array,
  		default:[]
  	},
  	columns:{
  		type:Array,
  		default:[]
  	}
  },
  data () {
    return {
      exportLoading: false,
      title:[],
      keys:[]
  }
 },   
  methods: {
    exportExcel () {
      if (this.list.length) {
        this.exportLoading = true
        const params = {
          title: this.title,
          key: this.keys,
          data: this.list,
          autoWidth: true,
          filename: '分类列表'
        }
        excel.export_array_to_excel(params)
        this.exportLoading = false
      } else {
        this.$Message.info('表格数据不能为空！')
      }
    },
    init() {
    	this.title = this.columns.map(item => {
    		if(item.title) {
    			return item.title
    		}
    	})
    	this.keys = this.columns.map(item => {
    		if(item.key) {
    			return item.key
    		}
    	})
    }
  },
  created () {
  	// 下载数据处理
	this.init()
  },
  mounted () {

  }
}
</script>
