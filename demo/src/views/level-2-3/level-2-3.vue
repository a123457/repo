<template>
  <div>
    <Button type="primary" @click="show = !show ">按钮</Button>
    <CollapseTransition>
      <div class="tranfer" v-show="show">
        <p>哈哈哈啊哈哈哈哈哈哈啊</p>
        <p>哈哈哈啊哈哈哈哈哈哈啊</p>
        <p>哈哈哈啊哈哈哈哈哈哈啊</p>
        <p>哈哈哈啊哈哈哈哈哈哈啊</p>
        <p>哈哈哈啊哈哈哈哈哈哈啊</p>
        <p>哈哈哈啊哈哈哈哈哈哈啊</p>
        <p>哈哈哈啊哈哈哈哈哈哈啊</p>
      </div>
    </CollapseTransition>
    <Divider>函数组件</Divider>
    <Row>
      <Col :offset="6" :span="12">
        <xzyComponent :data="typeData"></xzyComponent>
      </Col>
      <Row>
        <Button type="primary" @click="change('video')">电影组件</Button>
        <Button type="primary" @click="change('img')">图片组件</Button>
        <Button type="primary" @click="change('text')">文本组件</Button>
      </Row>
    </Row>
  </div>
</template>
<script>
import CollapseTransition from "iview/src/components/base/collapse-transition"
import xzyComponent from "./model/xzy_components"
export default {
  name: "level_2_3",
  components: {
    CollapseTransition,
    xzyComponent
  },
  data () {
    return {
      show: false,
      typeData: {}
    }
  },
  created: function () {
    //默认为图片组件
    this.change('img');
  },
  methods: {
    change (type) {
      switch (type) {
        case 'img':
          this.typeData = {
            type: 'img',
            url: 'http://img5.imgtn.bdimg.com/it/u=4070328047,1537080394&fm=26&gp=0.jpg'
          }
          break;
        case 'video':
          this.typeData = {
            type: 'video',
            url: 'https://haokan.baidu.com/v?pd=wisenatural&vid=8724405809980944509'
          }
          break;
        case 'text':
          this.typeData = {
            type: 'text',
            content: '华为将智慧屏称为适应万物互联环境下的“新物种”，是一台联接万物的“超级设备”。华为的目标是将智慧屏打造为家庭的智慧交互中心、跨屏体验中心、IoT控制中心、影音娱乐中心，为用户打造全新的智慧生活体验。'
          }
          break;
        default:
          this.$Notice.warning({
            desc: '类型不合法'
          });
      }
    }
  }
}
</script>
<style scoped>
.tranfer {
  border: 1px solid skyblue;
}
</style>
