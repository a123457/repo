<!--
 * @Company: Inossem
 * @Author: zhanyu
 * @Email: zhanyu.xu@inossem.com
 * @Date: 2020-03-17 16:13:33
 * @LastEditors: zhanyu
 * @LastEditTime: 2020-03-27 09:23:25
 * @Description: description
 -->
 <template>
  <div :style="showHeight">
    <div class="show_info">
      <div class="show_info_child">
        <span class="border_b_l show_span_l">{{title1}}</span>
        <span class="border_b_l show_span_r">
          <span class="border_list" v-for="item in value2">{{ item }}</span>
        </span>
      </div>
      <div class="show_info_child">
        <span class="border_b_l show_span_l">{{title2}}</span>
        <span class="border_b_r_l show_span_r">
          <span class="border_list" v-for="item in value2">{{ item }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title1: {
      type: String,
      default: ''
    },
    title2: {
      type: String,
      default: ''
    },
    value1: {
      type: Array,
      default: () => []
    },
    value2: {
      type: Array,
      default: () => []
    },
    isFirst: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '30px'
    }
  },
  computed: {
    showHeight () {
      return {
        height: this.height,
        borderTop: this.isFirst ? '1px solid #ccc' : ''
      }
    }
  },
  name: 'showin',
}
</script>

<style scoped>
.show_info {
  width: 100%;
  height: 100%;
}
.show_info_child {
  width: 50%;
  display: inline-block;
  height: 100%;
}
.border_b_l {
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
.border_b_r_l {
  border: 1px solid #ccc;
  border-top: none;
}
.show_left {
  width: 100%;
  height: 100%;
}
.show_span_l {
  vertical-align: middle;
  box-sizing: border-box;
  display: inline-block;
  padding-left: 16px;
  padding-right: 25px;
  font-size: 18px;
  height: 100%;
  width: 220px;
  background-color: #eee;
  color: #262829;
  line-height: 40px;
  text-align: left;
}
.show_span_r {
  vertical-align: top;
  box-sizing: border-box;
  padding-left: 16px;
  padding-right: 25px;
  font-size: 18px;
  height: 100%;
  width: calc(100% - 220px);
  background-color: #fff;
  color: #262829;
  line-height: 40px;
  text-align: left;
  display: inline-block;
  word-wrap: break-word;
}
.border_list {
  display: inline-block;
  width: 25%;
  height: 100%;
  line-height: 40px;
  text-align: left;
}
</style>

