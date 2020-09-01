<template>
  <Card shadow :padding="0">
    <Row>
      <Col :md="24" :lg="0">
        <Tabs v-model="tabName" @on-click="changeTabs">
          <TabPane label="设置一" name="option1"></TabPane>
          <TabPane label="设置二" name="option2"></TabPane>
          <TabPane label="设置三" name="option3"></TabPane>
        </Tabs>
      </Col>
    </Row>
    <Row style="padding:16px">
      <Col :sm="0" :md="4">
        <CellGroup>
          <Cell title="设置一" to="/xzy/manage" />
          <Cell title="设置一" to="/xzy/manage" />
          <Cell title="设置一" to="/xzy/manage" />
        </CellGroup>
      </Col>
      <Col :sm="24" :md="20">
        <Row :gutter="24">
          <Col span="12">
            <Form label-position="top" :model="form">
              <FormItem label="邮箱">
                <Input type="text" v-model.trim="form.mail"></Input>
              </FormItem>
              <FormItem label="昵称">
                <Input type="text" v-model="form.name"></Input>
              </FormItem>
              <FormItem label="个人介绍">
                <Input
                  v-model="form.desc"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 5}"
                  placeholder="输入介绍"
                ></Input>
              </FormItem>
              <FormItem label="国家">
                <Select v-model="form.country" transfer></Select>
              </FormItem>
              <FormItem label="电话">
                <Row :gutter="16">
                  <Col span="6">
                    <Input type="text" v-model="form.zoon"></Input>
                  </Col>
                  <Col span="18">
                    <Input type="text" v-model="form.phone"></Input>
                  </Col>
                </Row>
              </FormItem>
            </Form>
            <Button type="primary" long @click="getCool">{{$t('app')}}</Button>
          </Col>
          <Col span="12">
            <Avatar
              src="http://img1.xcarimg.com/exp/2872/2875/2937/20101220130509576539.jpg"
              size="large"
            />
            <Upload
              :before-upload="handelUpload"
              :format="['jpg', 'gif', 'png', 'jpeg']"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <Button icon="ios-cloud-upload-outline">Upload files</Button>
            </Upload>
            <img :src="imgUrl" v-if="imgUrl" />
          </Col>
        </Row>
      </Col>
    </Row>
  </Card>
</template>

<script>
export default {
  data () {
    return {
      tabName: 'option1',
      form: {
        mail: '',
        name: '',
        desc: '',
        country: 'China',
        zoon: '0101',
        phone: '1001021021'
      },
      imgUrl: ''
    }
  },
  mounted: function () {
    this.form.desc = this.$store.state.app.isCool
  },
  methods: {
    changeTabs (name) {
      this.tabsName = name
    },
    getCool () {
      console.log(this.form.mail.length)
      this.$store.commit("saveCool", 'xzyCool')
    },
    handelUpload (file) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        this.imgUrl = reader.result
      }

    }
  }
}
</script>

<style>
</style>
