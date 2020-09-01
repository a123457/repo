<!--
 * @Company: Inossem
 * @Author: Jiang Xiao
 * @Email: xiao.jiang@inossem.com
 * @Date: 2019-09-05 09:05:35
 * @LastEditors: xiao.jiang
 * @LastEditTime: 2019-09-05 09:05:35
 * @Description: description
 -->
<template>
  <div>
    <h1>物资配送</h1>
    <Table
      ref="table"
      :columns="columns"
      :data="data"
      :loading="loading"
      size="small"
      @on-filter-change="filterChange"
      @on-sort-change="sortChange"
    >
      <template slot="action" slot-scope="timeDate">
        <div v-if="timeDate.type === 1" style="text-align:center">---</div>
        <Select v-else>
          <!-- <Option v-for="key in timeDate" :value="timeDate[key]" :key="key">{{ timeDate[key] }}</Option> -->
          <Option :value="timeDate.startTime">{{timeDate.startTime}}</Option>
          <Option :value="timeDate.endTime">{{timeDate.endTime}}</Option>
        </Select>
      </template>
    </Table>
    <div style="text-align: center;margin: 0 5px;">
      <Page
        :total="total"
        :current.sync="current"
        :page-size-opts="[20, 40, 100, 200]"
        show-sizer
        @on-change="getData"
        @on-page-size-change="hangelChangeSzie"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "dev",
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
          title: this.$t("matCode"),
          key: "matCode",
        },
        {
          title: this.$t("matName"),
          key: "matName",
        },
        {
          title: this.$t("address"),
          key: "address"
        },
        {
          title: this.$t("contact"),
          key: "phone"
        },
        {
          title: this.$t("email"),
          key: "email",
        },
        {
          title: this.$t("distributionType"),
          key: "distributionType",
          render: (h, params) => {
            if (params.row.distributionType === 1) {
              return h('Tag', {
                props: {
                  color: 'green'
                }
              }, this.$t('selfMention'))
            } else if (params.row.distributionType === 2) {
              return h('Tag', {
                props: {
                  color: 'green'
                }
              }, this.$t('delivery'))
            }
          },
          filters: [
            {
              label: this.$t('selfMention'),
              value: 1
            },
            {
              label: this.$t('delivery'),
              value: 2
            }
          ],
          filterMultiple: false,
          filterRemote (value) {
            this.fileType = value[0]
          }
        },
        {
          title: this.$t("deliveryType"),
          render: (h, { row }) => {
            return h('div',
              this.$refs.table.$scopedSlots.action({
                startTime: row.monDate,
                endTime: row.nigDate,
                type: row.distributionType
              })
            )
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
      if (this.loading) return;
      this.$xzy
        .ajax({
          method: "post",
          url: `data/get_push_info`,
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
    },
    hangelChangeSzie (size) {
      this.size = size;
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
