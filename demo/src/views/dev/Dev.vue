<!--
 * @Company: Inossem
 * @Author: zhanyu
 * @Email: zhanyu.xu@inossem.com
 * @Date: 2019-09-05 09:05:35
 * @LastEditors: zhanyu
 * @LastEditTime: 2020-07-01 16:06:29
 * @Description: description
--> 
<template>
  <div>
    <h1>服务器分页自定义序号</h1>
    <Row :gutter="16">
      <Col :xs="4" :sm="4" :lg="3" :xl="2">
        <exportExcel v-if="isGetListData" :list="data" :columns="columns" />
      </Col>
      <Col :xs="4" :sm="4" :lg="3" :xl="2">
        <uploadExcel @getExcelData="getExcelData" />
      </Col>
    </Row>
    <Table
      :columns="columns"
      :data="data"
      :loading="loading"
      size="small"
      @on-filter-change="filterChange"
      @on-sort-change="sortChange"
    ></Table>
    <div style="text-align: center;margin: 0 5px;">
      <Page
        :total="total"
        :page-size-opts="[20,40,100,200,300]"
        :current.sync="current"
        show-sizer
        @on-change="getData"
        @on-page-size-change="hangelChangeSzie"
      />
    </div>
  </div>
</template>

<script>
import exportExcel from "@/components/excel/export-excel.vue";
import uploadExcel from "@/components/excel/upload-excel.vue";
export default {
  name: "dev",
  components: {
    exportExcel,
    uploadExcel
  },
  data () {
    return {
      excelData: [], // excel获取的全部数据，用途分页
      isGetExcelData: false, //是否是从excel获取数据 如果从excel 获取数据需要前台做假分页
      isGetListData: false,
      columns: [
        {
          title: this.$t("index"),
          key: "index",
          width: 80,
          align: "center"
        },
        {
          title: this.$t("code"),
          key: "code",
          sortable: true
        },
        {
          title: this.$t("id"),
          key: "id",
          sortable: true
        },
        {
          title: this.$t("name"),
          key: "name",
          sortable: true
        },
        {
          title: this.$t("address"),
          key: "address"
        },
        {
          title: this.$t("email"),
          key: "email",
        },
        {
          title: this.$t("qty"),
          key: "qty",
          render: (h, params) => {
            var formatValue = value => {
              value = "" + value;
              return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            };
            var parserValue = value => {
              value = "" + value;
              return value.replace(/$\s?|(,*)/g, "");
            };
            return h("InputNumber", {
              props: {
                value: Number(params.row.qty),
                min: 0,
                formatter: formatValue,
                parser: parserValue
              },
              on: {
                input: value => {
                  params.row.qty = value;
                  this.data[params.index] = params.row;
                }
              }
            });
          }
        },
        {
          title: this.$t("status"),
          key: "status",
          render: (h, params) => {
            if (params.row.status === 1) {
              return h('Tag', {
                props: {
                  color: 'green'
                }
              }, this.$t('level1'))
            } else if (params.row.status === 2) {
              return h('Tag', {
                props: {
                  color: 'green'
                }
              }, this.$t('level2'))
            }
          },
          filters: [
            {
              label: this.$t('level1'),
              value: 1
            },
            {
              label: this.$t('level2'),
              value: 2
            }
          ],
          filterMultiple: false,
          filterRemote (value) {
            this.fileType = value[0]
          }
        }
      ],
      data: [],
      loading: false,
      total: 0,
      current: 1,
      size: 10,
      fileType: '',
      key: '',
      order: 'asc'
    };
  },
  created () { },
  mounted () {
    this.getData();
  },
  methods: {
    getData (value) {
      if (!this.isGetExcelData) {
        if (this.loading) return;
        this.loading = true;
        this.$xzy
          .ajax({
            method: "post",
            url: `data/list`,
            data: {
              current: this.current,
              size: this.size,
              key: this.key,
              order: this.order,
              fileType: this.fileType
            }
          })
          .then(res => {
            var data = res.data.data;
            this.data = data.data;
            this.total = data.count;
            this.loading = false;
            this.data.forEach((item, i) => {
              item.index = i + 1;
            });
            if (this.data && this.data.length) {
              this.isGetListData = true;
            }
          })
          .catch(e => {
            this.$Notice.error({
              title: "失败",
              desc: "数据请求失败"
            });
          });
      } else {
        let start = (this.current - 1) * this.size;
        let end =
          this.current * this.size > this.excelData.length
            ? this.excelData.length
            : this.current * this.size;
        this.data = this.excelData.slice(start, end);
      }
    },
    hangelChangeSzie (size) {
      this.size = size;
      this.$nextTick(() => {
        this.getData();
      });
    },
    // 从excel数据 要初始化页数和页面显示的条数
    getExcelData (data) {
      console.log(data)
      if (data && data.length) {
        this.total = data.length;
      } else {
        this.loading = false;
        this.total = 0;
      }
      this.current = 1;
      this.isGetExcelData = true;
      this.excelData = data; // 获取所有数据
      this.$nextTick(() => {
        this.getData();
      });
    },
    /**
     * 排序
     */
    sortChange (column) {
      this.key = column.key
      this.order = column.order
      this.getData()
    },
    filterChange (data) {
      this.getData()
    }
  }
};
</script>

<style>
</style>
