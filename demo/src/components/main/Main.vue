<template>
  <Layout class="main">
    <Header class="header">
      <Row>
        <Col span="3">
          <Row style="height:60px;overflow: hidden;">
            <Col span="18">
              <img src="../../assets/timg.jpg" class="logo" />
            </Col>
            <Col span="6">
              <div @click="changIcon">
                <Icon type="ios-menu" v-show="collapsible" :size="22" />
                <Icon type="ios-list-box-outline" v-show="!collapsible" :size="22" />
              </div>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Menu mode="horizontal" :active-name="activeName">
            <MenuItem to="/xzy/app" name="/xzy/app">{{$t('app')}}</MenuItem>
            <MenuItem to="/xzy/push" name="/xzy/push">{{$t('push')}}</MenuItem>
            <MenuItem to="/xzy/dev" name="/xzy/dev">{{$t('dev')}}</MenuItem>
            <MenuItem to="/xzy/manage" name="/xzy/manage">{{$t('manage')}}</MenuItem>
          </Menu>
        </Col>
        <Col span="7">
          <Row>
            <Col span="6">
              <Dropdown trigger="click" @on-visible-change="getshow">
                <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                <Icon type="ios-arrow-down" v-show="isDown" />
                <Icon type="ios-arrow-up" v-show="isUp" />
                <DropdownMenu slot="list">
                  <DropdownItem>
                    <router-link to="/xzy/app">我的主页</router-link>
                  </DropdownItem>
                  <DropdownItem>我的收藏</DropdownItem>
                  <DropdownItem>
                    设置
                    <Badge status="error" />
                  </DropdownItem>
                  <DropdownItem divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col span="6">
              <Dropdown trigger="click">
                <Badge :count="messageCount" :offset="[20,2]">
                  <Icon type="ios-notifications-outline" size="22"></Icon>
                </Badge>
                <DropdownMenu slot="list">
                  <Tabs value="notice">
                    <TabPane label="通知" name="notice">
                      <div class="messageInfo">今天开始放4天假</div>
                    </TabPane>
                    <TabPane label="系统" name="system">
                      <div class="messageInfo">这是个虚假的通知</div>
                    </TabPane>
                    <TabPane label="关注" name="floow">
                      <div class="messageInfo">怎么可能</div>
                    </TabPane>
                  </Tabs>
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col span="6">
              <Icon type="md-barcode" @click="isShowInfo=true" />
            </Col>
            <Col span="6">
              <language @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
    <Layout>
      <Sider
        class="sider"
        width="240"
        collapsible
        v-model="collapsible"
        :class="{'sider-hide':collapsible}"
      >
        <side-menu
          :collapsed="collapsible"
          :menu-list="menuList"
          :active-name="$route.name"
          :accordion="true"
          @on-select="turnToPage"
        >
          <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
          <div class="logo-con">
            <img v-show="!collapsible" :src="maxLogo" key="max-logo" />
            <img v-show="collapsible" :src="minLogo" key="min-logo" />
          </div>
        </side-menu>
      </Sider>
      <Content class="main-content-con content-excude" :class="{'content-extend':collapsible}">
        <Layout class="main-layout-con">
          <div class="haha" style="color:#000">
            <BreadList :list="breadCrumbList"></BreadList>
          </div>
          <Content class="content-wrapper">
            <transition name="fade-transform" mode="out-in">
              <keep-alive :include="cacheList">
                <router-view />
              </keep-alive>
            </transition>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>
    <choice-role :isShowInfo.sync="isShowInfo" />
  </Layout>
</template>

<script>
import choiceRole from "./module/choiceRole.vue";
import language from "./module/language";
import SideMenu from "./module/side-menu";
import { mapMutations } from "vuex";
import minLogo from "@/assets/tim.jpg";
import maxLogo from "@/assets/tim1.jpg";
import BreadList from "./module/breadList";
import ABackTop from "./module/a-back-top";
import "./main.less";
export default {
  components: {
    choiceRole,
    language,
    SideMenu,
    BreadList,
    ABackTop
  },
  inject: ["reload"],
  data () {
    return {
      activeName: "",
      isDown: true,
      isUp: false,
      minLogo,
      maxLogo,
      messageCount: 2,
      isShowInfo: false,
      collapsible: false
    };
  },
  mounted () {
    // 设置初始语言
    this.setBreadCrumb(this.$route);
    //			this.setLocal(this.$i18n.locale)
  },
  created () {
    this.activeName = this.$route.path;
  },
  watch: {
    $route (newRoute) {
      this.activeName = this.$route.path;
      this.setBreadCrumb(newRoute);
    }
  },
  computed: {
    // 面包屑数据
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList;
    },
    menuList () {
      return this.$store.getters.menuList;
    },
    local () {
      return this.$store.state.app.local;
    },
    cacheList () {
      const list = [
        "ParentView",
        ...(this.menuList.length
          ? this.menuList
            .filter(item => !(item.meta && item.meta.notCache))
            .map(item => item.name)
          : [])
      ];
      return list;
    }
  },
  methods: {
    ...mapMutations(["setLocal", "setBreadCrumb"]),
    //刷新页面
    getshow (value) {
      if (value) {
        this.isDown = false;
        this.isUp = true;
      } else {
        this.isDown = true;
        this.isUp = false;
      }
    },
    changIcon () {
      this.collapsible = !this.collapsible;
      //
    },
    stroageItem (value) { },
    turnToPage (route) {
      console.log(route);
      let { name, params, query } = {};
      if (typeof route === "string") name = route;
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf("isTurnByHref_") > -1) {
        window.open(name.split("_")[1]);
        return;
      }
      this.$router.push({
        name,
        params,
        query
      });
    }
  }
};
</script>
