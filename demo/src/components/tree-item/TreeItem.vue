<!--
 * @Company: Inossem
 * @Author: zhanyu
 * @Email: zhanyu.xu@inossem.com
 * @Date: 2019-11-21 22:59:50
 * @LastEditors: zhanyu
 * @LastEditTime: 2019-12-15 16:23:20
 * @Description: description
 -->
<template>
  <li>
    <div v-if="hasChild" @click="findChildOrParent">
      <Icon type="ios-arrow-up" color="#2db7f5" v-if="data.isOpen" />
      <Icon type="ios-arrow-down" color="#2db7f5" v-else />
      <span :class="['margin', {isColor: data.hightLight }]">{{ data.groupName }}</span>
    </div>
    <div v-else @click="findChildOrParent">
      <span :class="['margin', {isColor: data.hightLight }]">{{ data.groupName }}</span>
    </div>
    <div style="margin-left:10px">
      <Button type="success" @clcik="editGroup" size="small" ghost style="margin-right: 10px">编辑</Button>
      <Button type="primary" ghost v-if="!hasChild" @clcik="deleteGroup" size="small">删除</Button>
    </div>
    <ul v-show="data.isOpen" v-if="hasChild">
      <tree-item v-for="(item, index) in data['subProcGroup']" :data="item" :key="index"></tree-item>
    </ul>
  </li>
</template>

<script>
import { findComponentUpward } from '@/libs/util';
export default {
  name: 'TreeItem', //递归组件必须有name
  props: {
    data: {
      type: [Object, Array], //多个可能的类型
      required: true
    },
  },
  created () {
    this.nowStatus = this.data.isOpen
    this.groupId = this.data.groupId
  },
  data () {
    return {
      groupId: '',
      nowStatus: false, // 当前的点击状态
    }
  },
  computed: {
    // 判断当前级别是否还有children
    hasChild () {
      return this.data['subProcGroup'] && this.data['subProcGroup'].length
    }
  },
  methods: {
    // 点击子菜单也要判断是否有children，有就展开
    findChildOrParent () {
      this.nowStatus = !this.nowStatus
      let arr = []
      let obj = {
        nowStatus: this.nowStatus,
        groupId: this.data.groupId,
        groupName: this.data.groupName
      }
      if (this.nowStatus) {
        arr = this.findComponentGroup(this, 'TreeItem', 'apphome', [this.groupId])
      }
      var parent = findComponentUpward(this, 'apphome')
      parent.openOrClose(obj, arr)
    },
    findComponentGroup (context, componentName, parentName, arr, componentNames) {
      if (typeof componentName === 'string') {
        componentNames = [componentName]
      } else {
        componentNames = componentName
      }

      let parent = context.$parent
      let name = ''
      if (parent.$options) {
        name = parent.$options.name || ''
      }
      while (parent && name != parentName) {
        if (componentNames.indexOf(name) >= 0) {
          arr.push(parent.groupId)
        }
        parent = parent.$parent
        if (parent && parent.$options) {
          name = parent.$options.name || ''
        } else {
          name = ''
        }
      }
      return arr
    },
    // 删除当前行数据
    deleteGroup () {

    },
    //编辑修改当前行数据
    editGroup () {

    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 20px;
}
li > div {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  font-size: 14px;
}
li .margin {
  margin-left: 10px;
}
.isColor {
  color: #2db7f5;
}
</style>
