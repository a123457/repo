<!--
 * @Company: Inossem
 * @Author: zhanyu
 * @Email: zhanyu.xu@inossem.com
 * @Date: 2020-07-01 16:03:57
 * @LastEditors: zhanyu
 * @LastEditTime: 2020-07-01 16:41:54
 * @Description: description
--> 
<template>
  <div id="xzy">
    <smart-component :data="data">
      <span>展毓长得真帅</span>
    </smart-component>
    <button @click="change('img')">图片组件</button>
    <button @click="change('video')">视频组件</button>
    <button @click="change('text')">文本组件</button>
  </div>
</template>
<script>
import Vue from 'vue'
var imgOptions = {
  props: ['data'],
  render: function (createElement) {
    return createElement('div', [
      createElement('p', '图片组件'),
      createElement('img', {
        attrs: {
          src: this.data.url,
          height: 300,
          weight: 400

        }
      })
    ]);
  }
};
var videoOptions = {
  props: ['data'],
  render: function (createElement) {
    return createElement('div', [
      createElement('p', '视频组件'),
      createElement('video', {
        attrs: {
          src: this.data.url,
          controls: 'controls',
          autoplay: 'autoplay'
        }
      })
    ]);
  }
};

//文本组件设置
var textOptions = {
  props: ['data'],
  render: function (createElement) {
    return createElement('div', [
      createElement('p', '文本组件'),
      createElement('p', this.data.content)
    ]);
  }
};

Vue.component('smart-component', {
  //设置为函数化组件
  functional: true,
  render: function (createElement, context) {
    console.log(context)
    function get () {
      var data = context.props.data;

      console.log("smart-component/type:" + data.type);
      //判断是哪一种类型的组件
      switch (data.type) {
        case 'img':
          return imgOptions;
        case 'video':
          return videoOptions;
        case 'text':
          return textOptions;
        default:
          console.log("data 类型不合法：" + data.type);
      }
    }
    return createElement(
      get(),
      {
        props: {
          data: context.props.data
        }
      },
      context.children
    )
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
})
export default {
  name: 'functional',
  data () {
    return {
      data: {}
    }
  },
  methods: {
    change: function (type) {
      console.log("输入类型：" + type);
      switch (type) {
        case 'img':
          this.data = {
            type: 'img',
            url: 'http://pic-bucket.ws.126.net/photo/0001/2019-02-07/E7D8PON900AO0001NOS.jpg'
          }
          break;
        case 'video':
          this.data = {
            type: 'video',
            url: 'http://wxapp.cp31.ott.cibntv.net/6773887A7F94A71DF718E212C/03002002005B836E73A0C5708529E09C1952A1-1FCF-4289-875D-AEE23D77530D.mp4?ccode=0517&duration=393&expire=18000&psid=bbd36054f9dd2b21efc4121e320f05a0&ups_client_netip=65600b48&ups_ts=1549519607&ups_userid=21780671&utid=eWrCEmi2cFsCAWoLI41wnWhW&vid=XMzc5OTM0OTAyMA&vkey=A1b479ba34ca90bcc61e3d6c3b2da5a8e&iv=1&sp='
          }
          break;
        case 'text':
          this.data = {
            type: 'text',
            content: '《流浪地球》中的科学：太阳何时吞并地球？科学家已经给出时间表'
          }
          break;
        default:
          console.log("data 类型不合法：" + type);
      }

    }
  },
  created: function () {
    //默认为图片组件
    this.change('img');
  }
}
</script>
