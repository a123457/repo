<!--
 * @Company: Inossem
 * @Author: zhanyu
 * @Email: zhanyu.xu@inossem.com
 * @Date: 2020-06-03 23:08:02
 * @LastEditors: zhanyu
 * @LastEditTime: 2020-08-03 14:42:21
 * @Description: description
--> 
<template>
  <div class="my-outbox" ref="outbox">
    <div class="my-inbox" ref="box">
      <div class="my-list" v-for="(item,index) in sendVal" :key="index" ref="list">
        {{item.place}}
        <span class="my-uname">{{item.name}}</span>哈啊飒飒
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-marquee-left',
  props: {
    sendVal: Array
  },
  data () {
    return {
      nowTime: null,//定时器标识
      disArr: [],//每一个内容的宽度
      innerWidth: 0,
      outerWidth: 0
    }
  },
  mounted () {
    var width = 0
    var that = this;
    var item = this.$refs.list;
    var len = this.sendVal.length;
    var arr = [];
    var margin = this.getMargin(item[0]) //因为设置的margin值一样，所以取第一个就行。
    for (var i = 0; i < len; i++) {
      width += (item[i].offsetWidth + margin)
      arr.push(item[i].offsetWidth + margin)//把宽度和 margin 加起来就是每一个元素需要移动的距离
    }
    this.innerWidth = width
    this.outerWidth = this.$refs.outbox.offsetWidth
    this.$refs.box.style = 'transform: translateX(' + this.$refs.outbox.offsetWidth + 'px)'
    this.disArr = arr;
    this.moveLeft();
  },
  beforeDestroy: function () {
    clearInterval(this.nowTime);//页面关闭清除定时器
    this.nowTime = null;//清除定时器标识
  },
  methods: {
    //获取margin属性
    getMargin: function (obj) {
      var marg = window.getComputedStyle(obj, null)['margin-right'];
      marg = marg.replace('px', '')
      return Number(marg) //强制转化成数字
    },
    //移动的方法
    moveLeft: function () {
      var outbox = this.$refs.box;
      var that = this;
      var startDis = 0;//初始位置
      this.nowTime = setInterval(function () {
        startDis -= 0.5;
        if (that.outerWidth > that.innerWidth) {
          if (Math.abs(startDis) >= (that.innerWidth + outbox.offsetWidth)) {
            that.$refs.box.style = 'transform: translateX(' + outbox.offsetWidth + 'px)'
            startDis = 0
          }
          outbox.style = 'transform: translateX(' + (startDis + outbox.offsetWidth) + 'px)';
        } else {
          if (Math.abs(startDis) > Math.abs(that.disArr[0])) {
            that.disArr.push(that.disArr.shift())//每次移动完一个元素的距离，就把这个元素的宽度
            that.sendVal.push(that.sendVal.shift())//每次移动完一个元素的距离，就把列表数据的第一项放到最后一项
            startDis = 0;
          }
          outbox.style = 'transform: translateX(' + startDis + 'px)';
        }
        //每次都让盒子移动指定的距离
      }, 1000 / 60)
    }
  }
}
</script>

<style scoped>
.my-outbox {
  width: 100%;
  color: #d7bc8d;
  overflow: hidden;
  height: 35px;
  background: #422b02;
}
.my-inbox {
  white-space: nowrap;
}
.my-list {
  margin-right: 25px;
  display: inline-block;
  font-size: 13px;
  height: 35px;
  line-height: 35px;
}
.my-uname {
  color: #ff8900;
}
</style>

