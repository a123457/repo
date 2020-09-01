<!--
 * @Company: Inossem
 * @Author: zhanyu
 * @Email: zhanyu.xu@inossem.com
 * @Date: 2019-10-30 15:21:02
 * @LastEditors: zhanyu
 * @LastEditTime: 2019-11-03 18:57:31
 * @Description: description
 -->
 <style scope>
.timeuntil {
  width: 302px;
  border: 1px solid #ccc;
  box-shadow: 10px 10px 5px #888888;
  padding: 10px;
}
.headr {
  height: 40px;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
}
.headr li {
  list-style-type: none;
}
.text_top {
  height: 40px;
  display: flex;
  line-height: 40px;
  font-size: 20px;
  color: #2d8cf0;
}
.wh_content_item {
  width: 36px;
  padding: 0 2px;
  text-align: center;
}
.wh_content {
  font-size: 14px;
}
.wh_content_item {
  height: 30px;
  line-height: 30px;
  width: 40px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  position: relative;
}
.is_hover:hover {
  background: #2d8cf0;
}
</style>
<template>
  <div>
    <div class="timeuntil">
      <div class="headr">
        <li class="predate" @click="getperDate">
          <Icon type="ios-arrow-back" size="30" color="#2D8CF0" />
        </li>
        <li class="nowdate">{{nowDate}}</li>
        <li class="nextdate" @click="getnextDate">
          <Icon type="ios-arrow-forward" size="30" color="#2D8CF0" />
        </li>
      </div>
      <div class="text_top">
        <div class="wh_content_item" v-for="tag in textTop">
          <div class="wh_top_tag">{{tag}}</div>
        </div>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(item,index) in list" @click="clickDay(item,index)">
          <span
            v-if="item.isToday"
            style="display: inline-block; position: absolute; font-weight: bold; width: 30px; height:30px; font-size: 10px;color: #d11f11;background:#2d8cf0;border-radius:50%;top:-10px"
          >{{countList}}</span>
          <div
            @click="clickData(item.isToday)"
            class="wh_item_date"
            :class="{is_hover: !item.isToday}"
          >{{item.id}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import timeutil from './candel.js'
export default {
  props: {
    textTop: {
      type: Array,
      default: () => ["日", "一", "二", "三", "四", "五", "六"]
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    }
  },
  created () {
    this.getList(this.myDate)
  },
  data () {
    return {
      nowDate: '', // 当前点击的日期
      myDate: new Date(), // 当前点击的日期 默认当前日期
      list: [], // 日期的数组,
      countList: 21, // 当前待办事项
    }
  },
  methods: {
    formatDate (date) {
      return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`
    },
    getList (date) {
      this.nowDate = this.formatDate(date)
      this.list = timeutil.getMonthList(date)
    },
    // 获取上个月的日期数组
    getperDate () {
      this.myDate = timeutil.getBeforeOrNext(this.myDate, 'before')
      this.getList(this.myDate)
    },
    // 获取下个月的日期数组
    getnextDate () {
      this.myDate = timeutil.getBeforeOrNext(this.myDate, 'next')
      this.getList(this.myDate)
    },
    clickDay () {

    }
  }
}
</script>
