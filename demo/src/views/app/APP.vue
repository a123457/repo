<!--
 * @Company: Inossem
 * @Author: zhanyu
 * @Email: zhanyu.xu@inossem.com
 * @Date: 2019-09-05 09:05:35
 * @LastEditors: zhanyu
 * @LastEditTime: 2020-09-01 16:27:52
 * @Description: description
 -->
<template>
  <div class="about">
    <Row :gutter="16">
      <Col span="6">
        <Card shadow title="访问量">
          <Tag color="success" slot="extra">周</Tag>
          <div class="count">123,000</div>
          <Divider></Divider>
          <div>日访问量：12,000</div>
        </Card>
      </Col>
      <Col span="6">
        <Card shadow title="总销售额">
          <Tooltip :content="$t('textInfo')" slot="extra" placement="top" transfer>
            <Icon type="md-aperture" size="18" />
          </Tooltip>
          <div class="count">￥:86,000</div>
          <Divider></Divider>周同比:12%
          <Icon type="md-arrow-dropup" size="22" color="#ed4014" />日环比:10%
          <Icon type="md-arrow-dropdown" size="22" color="#19be6b" />
        </Card>
      </Col>
      <Col span="6">
        <Card shadow title="运营活动效果">
          <Tooltip :content="$t('textInfo')" slot="extra" placement="top" transfer>
            <Icon type="md-aperture" size="18" />
          </Tooltip>
          <div class="count">75%</div>
          <Divider></Divider>
          <Progress :percent="75" />
        </Card>
      </Col>
      <Col span="6">
        <Card shadow title="快捷操作">
          <Row>
            <Col v-for="item in shotCuts" :key="item.title" span="8">
              <Button :to="item.action">{{item.title}}</Button>
            </Col>
          </Row>
          <Divider></Divider>
          <Button type="primary" long icon="md-add" @click="isShow=true">添加</Button>
        </Card>
      </Col>
    </Row>
    <Card shadow style="margin-top:16px;">
      <Tabs v-model="tabsName" @on-click="changeTabs">
        <template slot="extra">
          <RadioGroup v-model="dataType" @on-change="handelSetDate">
            <Radio label="day">今日</Radio>
            <Radio label="week">本周</Radio>
            <Radio label="month">本月</Radio>
            <Radio label="year">今年</Radio>
          </RadioGroup>
          <DatePicker
            type="daterange"
            clearable
            transfer
            v-model="countDate"
            placement="bottom-end"
            placeholder="Select date"
            style="width: 250px"
          ></DatePicker>
        </template>
        <TabPane label="通知" name="sell">
          <Row :gutter="16">
            <Col span="12">
              <div style="height:450px;" ref="chart"></div>
            </Col>
            <Col span="6">
              <Table :columns="columns" :data="data"></Table>
            </Col>
            <Col span="6">
              <div class="notice_content">
                <div class="item_content" v-for="(item, index) in noticeList" :key="index">
                  <div class="head">
                    <div class="user_name">{{ item.name }}</div>
                    <div class="create_time">{{ item.createTime }}</div>
                  </div>
                  <div class="contents">{{ item.content }}</div>
                </div>
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="分配" name="visit">
          <Row :gutter="16">
            <Col span="6">
              <Tree
                :data="treeData"
                show-checkbox
                @on-select-change="treeSelectChange"
                @on-check-change="treeCheckChange"
              ></Tree>
            </Col>
            <Col span="18" class="selfTransfer">
              <Transfer
                :data="tranData"
                :target-keys="tranTargetKey"
                :titles="['待分配', '已分配']"
                :render-format="renderLine"
                @on-change="handleChange"
              ></Transfer>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="行程" name="dateinfo">
          <dateNotic />
        </TabPane>
        <TabPane label="树状表格" name="treeitem">
          <div v-if="isShowGroup">
            <ul v-for="(item,index) in treeItemData" :key="index" class="spl">
              <TreeItem :data="item"></TreeItem>
            </ul>
          </div>
        </TabPane>
        <TabPane label="自定义" name="table">
          <showIn
            title1="近3次领用消耗周期"
            title2="近3次采购价格"
            :value1="['16 (一季度)', '2145 (二季度)', '34521 (三季度)', '12123 (四季度)']"
            :value2="['16 (一季度)', '2145 (二季度)', '34521 (三季度)', '12123 (四季度)']"
            :isFirst="true"
            height="40px"
          ></showIn>
        </TabPane>
        <TabPane label="动画" name="animate">
          <div style="width:500px;height:400px">
            <div class="app-table-body">
              <scroll-board :config="routeListConfig" style="width:100%;height:100%" />
            </div>
          </div>
        </TabPane>
        <TabPane label="跑马灯" name="marquee">
          <div class="marqu">
            <div class="title">公告:</div>
            <div class="anima">
              <marqueeLeft :send-val="send"></marqueeLeft>
            </div>
          </div>
        </TabPane>
        <TabPane label="自定义饼状图" name="pie">
          <div>
            <canvas id="pie" width="1000" height="500"></canvas>
          </div>
        </TabPane>
      </Tabs>
    </Card>
    <Modal width="500px" v-model="isShow" title="Common Modal dialog box title" @on-ok="ok">
      <Input type="text" v-model="baseInfo.title" :placeholder="$t('titles')"></Input>
      <Input type="text" v-model="baseInfo.action" :placeholder="$t('actions')"></Input>
    </Modal>
  </div>
</template>
<script>
import marqueeLeft from '@/components/marquee/marquee.vue'
import XzyMarquee from "@/libs/xzymarquee";
import dateNotic from "@/components/date_notic/dateNotic.vue"
import TreeItem from "@/components/tree-item/TreeItem.vue"
import showIn from "@/components/show_in/showIn.vue"
import ScrollBoard from './scrollBoard'
export default {
  name: 'apphome',
  components: {
    dateNotic,
    TreeItem,
    showIn,
    marqueeLeft,
    ScrollBoard
  },
  data () {
    return {
      pieData: [
        {
          name: '小红',
          value: 21,
          color: 'red'
        },
        {
          name: '小明',
          value: 40,
          color: 'blue'
        },
        {
          name: '小兰',
          value: 50,
          color: 'yellow'
        },
        {
          name: '小刚',
          value: 50,
          color: 'pink'
        }
      ],
      routeListConfig: {
        header: ['排名', '线路名称', '数量'],
        data: [
          ['皮卡丘', 1],
          ['波克比', 2],
          ['吉尼龟', 3],
          ['妙蛙种子', 4],
          ['皮丘', 5],
          ['可达鸭', 6]
        ],
        columnWidth: [80],
        key: 'route',
        index: true
      },
      isShowGroup: true,
      options: {
        callback: undefined
      },
      send: [{ place: "来自东莞市的", name: "黄女士" },
      { place: "来自济南市的", name: "孙女士" },
      { place: "来自杭州市的", name: "杨先生" }],
      treeItemData: [{
        "createId": "1",
        "createTime": 1574179200000,
        "groupId": "977ea9bb07b246cf9e148625c7f8aed6",
        "groupName": "总流程",
        "groupSort": 2,
        "level": 0,
        "parentId": "",
        "procdefId": null,
        "subProcGroup": [{
          "createId": "1",
          "createTime": 1574179200000,
          "groupId": "a75d276e43f7415f907de214e8fa745a",
          "groupName": "流112",
          "groupSort": 2,
          "level": 1,
          "parentId": "977ea9bb07b246cf9e148625c7f8aed6",
          "procdefId": null,
          "subProcGroup": [{
            "createId": "1",
            "createTime": 1574265600000,
            "groupId": "1bc68f98f1d14e5fbed3ebd10f546a5b",
            "groupName": "qqqw",
            "groupSort": 2,
            "level": 2,
            "parentId": "a75d276e43f7415f907de214e8fa745a",
            "procdefId": null,
            "subProcGroup": [{
              "createId": "1",
              "createTime": 1574265600000,
              "groupId": "1d126bf8e8004cec996466da5b23ad65",
              "groupName": "11212",
              "groupSort": 1,
              "level": 3,
              "parentId": "1bc68f98f1d14e5fbed3ebd10f546a5b",
              "procdefId": null,
              "subProcGroup": [],
              "subProcNum": null
            }, {
              "createId": "1",
              "createTime": 1574265600000,
              "groupId": "3985064843414c96a31972445bb5c8a4",
              "groupName": "232332",
              "groupSort": 2,
              "level": 3,
              "parentId": "1bc68f98f1d14e5fbed3ebd10f546a5b",
              "procdefId": null,
              "subProcGroup": [],
              "subProcNum": null
            }],
            "subProcNum": null
          }, {
            "createId": "1",
            "createTime": 1574265600000,
            "groupId": "75170c5527d04ecf91726f56d71fd757",
            "groupName": "1221",
            "groupSort": 1,
            "level": 2,
            "parentId": "a75d276e43f7415f907de214e8fa745a",
            "procdefId": null,
            "subProcGroup": [],
            "subProcNum": null
          }],
          "subProcNum": null
        }, {
          "createId": "1",
          "createTime": 1574265600000,
          "groupId": "af466bd1d12c405d91bbf270e5162b5c",
          "groupName": "121",
          "groupSort": 2,
          "level": 1,
          "parentId": "977ea9bb07b246cf9e148625c7f8aed6",
          "procdefId": null,
          "subProcGroup": [{
            "createId": "1",
            "createTime": 1574265600000,
            "groupId": "5aa015e743e242c899d5b43cc5b9aa0f",
            "groupName": "1234",
            "groupSort": 1,
            "level": 2,
            "parentId": "af466bd1d12c405d91bbf270e5162b5c",
            "procdefId": null,
            "subProcGroup": [],
            "subProcNum": null
          }],
          "subProcNum": null
        }],
        "subProcNum": null
      }],
      treeData: [
        // 树型结构数据
        {
          title: "全部权限",
          expand: false,
          selected: false,
          children: [
            {
              title: "权限1",
              expand: false,
              children: [
                {
                  title: "权限1-1",
                  code: "00001",
                  key: "00001-权限1-1"
                },
                {
                  title: "权限1-2",
                  code: "00002",
                  key: "00002-权限1-2"
                }
              ]
            },
            {
              title: "权限2",
              expand: false,
              children: [
                {
                  title: "权限2-1",
                  code: "00010",
                  key: "00010-权限2-1"
                },
                {
                  title: "权限2-2",
                  code: "00020",
                  key: "00020-权限2-2"
                }
              ]
            }
          ]
        }
      ],
      tranData: [], // 穿梭框数组
      tranTargetKey: [], //穿梭框选中的素组
      shotCuts: [
        {
          title: "操作一",
          action: "/xzy/app"
        },
        {
          title: "操作二",
          action: "/xzy/push"
        }
      ],
      baseInfo: {
        title: "",
        action: ""
      },
      isShow: false,
      tabsName: "marquee", // tabs切换名称
      dataType: "day", //单选框
      countDate: [new Date(), new Date()], //开始，截止日期
      noticeList: [], // 通知数据
      columns: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "销售额",
          key: "sell"
        }
      ],
      data: [
        {
          name: "John Brown",
          sell: 18
        },
        {
          name: "Jim Green",
          sell: 24
        },
        {
          name: "Joe Black",
          sell: 30
        },
        {
          name: "Jon Snow",
          sell: 26
        },
        {
          name: "Joe Black",
          sell: 30
        },
        {
          name: "Jon Snow",
          sell: 26
        },
        {
          name: "Joe Black",
          sell: 30
        },
        {
          name: "Jon Snow",
          sell: 26
        }
      ]
    };
  },
  created () {
    this.getNoticeList();
    this.initTree()
  },
  mounted () {
    this.drawLine();
    this.initCanvas()
    // new XzyMarquee(".xzy", {
    //   isEqual: false, // 所有滚动的元素长宽是否相等,true,false
    //   loop: 0, // 循环滚动次数，0是无限
    //   direction: "up", // 滚动方向，"left","right","up","down"
    //   scrollAmount: 1, // 步长
    //   scrollDelay: 50  // 时长
    // });
  },
  methods: {
    // 初始化canvas 画布
    initCanvas () {
      var canvas = document.getElementById('pie')
      this.drawPie(canvas)
    },
    drawPie (canvas) {
      debugger
      let ctx = canvas.getContext('2d')
      var totalNum = 0
      this.pieData.forEach(item => totalNum += item.value)
      var minLength = Math.min(canvas.width, canvas.height)
      let x0 = minLength / 2, y0 = minLength / 2, radius = (minLength / 2) * 0.9
      let firstPieangle = -90
      for (let i = 0; i < this.pieData.length; i++) {
        ctx.beginPath()
        ctx.save()
        ctx.moveTo(x0, y0)
        ctx.fillStyle = this.pieData[i].color
        var angle = Number(((this.pieData[i].value / totalNum) * 360).toFixed(2))
        var startAngle = firstPieangle * Math.PI / 180
        var endAngle = (firstPieangle + angle) * Math.PI / 180
        ctx.arc(x0, y0, radius, startAngle, endAngle)
        ctx.fillStyle = this.fillStyle
        ctx.closePath()
        ctx.fill()
        ctx.restore()
        var txt = this.pieData[i].name + ': (' + ((this.pieData[i].value / totalNum) * 100).toFixed(2) + '%)'
        var x1, y1, x2, y2 // 文字坐标
        var txtAngle = firstPieangle + 1 / 2 * angle
        x1 = x0 + Math.cos(txtAngle * Math.PI / 180) * radius
        y1 = y0 + Math.sin(txtAngle * Math.PI / 180) * radius
        x2 = x0 + Math.cos(txtAngle * Math.PI / 180) * (radius + 20)
        y2 = y0 + Math.sin(txtAngle * Math.PI / 180) * (radius + 20)
        ctx.save()
        ctx.moveTo(x1, y1)
        if (Math.sin(txtAngle * Math.PI / 180) < 0) {
          if (y2 < 0) {
            var l = Math.sin(txtAngle * Math.PI / 180) * 20
            if (l - y2 <= 1) {
              y2 = y0
            } else {
              y2 = y0 + l / 2
            }
          }
        }
        ctx.lineCap = 'square'
        ctx.lineTo(x2, y2)
        ctx.stroke();
        if (txtAngle > 90 && txtAngle < 270) {
          ctx.textAlign = 'end'
        }
        // 将画布的原点移动到正中央
        ctx.fillText(txt, x2, y2)
        // 计算当前的圆弧上的的点
        ctx.restore()
        firstPieangle += angle
      }
    },
    openOrClose (obj, arr = []) {
      this.isShowGroup = false
      if (arr.length) {
        this.OpenGroud(arr)
      } else { // 关闭当前数据这子数据
        var downData = this.findGroupIdDownData(obj) // 关闭数据
        var arrDown = this.findDownGroupIds(downData)
        this.CloseGroud(arrDown)
      }
      this.$nextTick(() => {
        this.isShowGroup = true
      })
    },
    // 递归向下寻找当前groupId与treeItemData 数组相匹配的数据(关闭)
    findGroupIdDownData (obj) {
      var arr = []
      let loadDatas = function (datas) {
        for (var i = 0; i < datas.length; i++) {
          if (datas[i].groupId === obj.groupId) {
            arr = datas[i]
            return
          } else {
            if (datas[i].subProcGroup.length > 0) {
              loadDatas(datas[i].subProcGroup)
            }
          }
        }
      }
      loadDatas(this.treeItemData)
      return arr
    },
    findDownGroupIds (data) {
      var arr = []
      let findId = function (data) {
        arr.push(data.groupId)
        if (data.subProcGroup.length) {
          for (var i = 0; i < data.subProcGroup.length; i++) {
            findId(data.subProcGroup[i])
          }
        }
      }
      findId(data)
      return arr
    },
    getParentsGroupId (id) {
      let findId = function (data) {
        for (var i in data) {
          if (data[i].regionCode == id) {
            return [data[i].regionCode];
          }
          if (data[i].children) {
            var ro = getParents(data[i].children, id);
            if (ro !== undefined) {
              return ro.concat(data[i].regionCode);
            }
          }
        }
      }
      findId(this.treeItemData)
      console.log(ro)
      return ro
    },
    OpenGroud (arr) {
      let openTrue = function (data) {
        for (var i = 0; i < data.length; i++) {
          if (arr.indexOf(data[i].groupId) > -1) {
            data[i].isOpen = true
            data[i].hightLight = true
          } else {
            data[i].isOpen = false
            data[i].hightLight = false
          }
          if (data[i].subProcGroup.length) {
            openTrue(data[i].subProcGroup)
          }
        }
      }
      openTrue(this.treeItemData)
    },
    CloseGroud (arr) {
      let closeTrue = function (data) {
        for (var i = 0; i < data.length; i++) {
          if (arr.indexOf(data[i].groupId) > -1) {
            data[i].isOpen = false
            data[i].hightLight = false
          }
          if (data[i].subProcGroup.length) {
            closeTrue(data[i].subProcGroup)
          }
        }
      }
      closeTrue(this.treeItemData)
    },
    /**
     * 初始化数据
     */
    initTree () {
      let tempList = this.treeItemData
      let loadDatas = function (datas) {
        datas.forEach((item) => {
          item.isOpen = false // 当前是否为展开状态
          item.hightLight = false // 高亮点击变色 
          if (item.subProcGroup.length > 0) {
            loadDatas(item.subProcGroup)
          }
        })
      }
      loadDatas(tempList)
      this.treeItemData = tempList
    },

    treeSelectChange (item) {
      if (item[0]) {
        item[0].expand = !item[0].expand
      }
      item[0].selected = !item[0].selected
    },
    // 复选框选中
    treeCheckChange (array, data) {
      console.log(data)
      this.getRoleData(data)
    },
    // 递归获取权限数据
    getRoleData (data) {
      if (data.children && data.children.length) {
        data.children.forEach(item => {
          if (item.children && item.children.length) {
            this.getRoleData(item)
          } else {
            this.tranData.push({
              title: item.title,
              code: item.code,
              key: item.key
            })
          }
        })
      } else {
        this.tranData.push({
          title: data.title,
          code: data.code,
          key: data.key
        })
      }
    },
    // 穿梭框改变事件
    handleChange () { },
    renderLine (item) {
      return item.title;
    },
    getNoticeList () {
      this.$xzy
        .ajax({
          method: "get",
          url: `data/get_notice_list`,
          data: {}
        })
        .then(res => {
          this.noticeList = res.data.data;
          this.$nextTick(() => {
            new XzyMarquee(".notice_content", {
              isEqual: false,
              loop: 0,
              direction: "up",
              scrollAmount: 1,
              scrollDelay: 30
            });
          });
        });
    },
    ok () {
      this.shotCuts.push({
        title: this.baseInfo.title,
        action: this.baseInfo.action
      });
      this.$set(this.baseInfo, "title", "");
      this.$set(this.baseInfo, "action", "");
    },
    changeTabs (name) {
      this.tabsName = name;
    },
    handelSetDate (val) {
      let today = new Date().getTime();
      let day;
      switch (val) {
        case "day":
          day = today;
          break;
        case "week":
          day = today - 86400000 * 7;
          break;
        case "month":
          day = today - 86400000 * 30;
          break;
        case "year":
          day = today - 86400000 * 365;
          break;
      }
      this.countDate = [new Date(day), new Date(today)];
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        title: { text: "销售额" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  }
};
</script>
<style type="text/css" scope>
.count {
  font-size: 24px;
}
.notice_content {
  width: 100%;
  height: 450px;
  padding: 5px;
  overflow: hidden;
}
.item_content {
  width: calc(100% - 10);
  background: #f9f9fd;
  padding-bottom: 10px;
}
.head {
  width: 100%;
  height: 24px;
  line-height: 24px;
  border-bottom: 1px solid #ccc;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}
.head .user_name {
  font-size: 16px;
  font-weight: bold;
}
.contents {
  width: 100%;
  font-size: 14px;
  text-indent: 28px;
  line-height: 18px;
}
.selfTransfer .ivu-transfer .ivu-transfer-list {
  display: inline-block;
  width: 45%;
  height: 400px;
  position: relative;
}
.tree-box {
  padding: 10px 25px;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  min-height: 400px;
  background-color: #dddddd;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
p {
  padding: 0;
  margin: 0;
}
.tree-ul {
  padding-left: 20px !important;
}
.tree-ul:first-child {
  padding-left: 0 !important;
}
.folder,
.node {
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.folder-box {
  cursor: pointer;
}
.folder-logo {
  display: inline-block;
  width: 12px;
  height: 11px;
  line-height: 7px;
  font-weight: 400;
  border: 1px solid #8e7878;
  color: #000;
  background: rgba(91, 192, 222, 0.1);
  text-align: center;
  margin-left: -15px;
  margin-top: 6px;
  margin-right: 5px;
}
.folder-true {
  color: #2494f2;
}
.node-true {
  color: #2494f2;
}
.marqu {
  width: 100%;
}
.marqu .title {
  display: inline-block;
  width: 50px;
}
.marqu .anima {
  display: inline-block;
  width: calc(100% - 50px);
}
@import "./board.css";
</style>
